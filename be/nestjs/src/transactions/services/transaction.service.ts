import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionDto } from '../http/dtos/transaction.dto';
import { TransactionStatusEnum } from '../enums/transaction-status.enum';
import { TransactionListDto } from '../http/dtos/transaction-list.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { OrderService } from 'src/orders/services/order.service';
import { ProductService } from 'src/products/services/product.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    private productService: ProductService,
  ) {}

  handleTransaction(
    transaction: TransactionDto,
    totalAmount: number,
  ): Promise<TransactionEntity> {
    transaction.status = TransactionStatusEnum.INCOMPLETE;
    return this.transactionRepo.save({
      ...transaction,
      totalAmount,
    });
  }

  async paginate(
    query: TransactionListDto,
  ): Promise<Pagination<TransactionEntity>> {
    const { limit, page, searchKey, transactionStatusType, sort, order } =
      query;
    const options: IPaginationOptions = {
      limit,
      page,
    };
    const qb = this.transactionRepo.createQueryBuilder('transaction');
    if (searchKey && searchKey.trim() !== '') {
      qb.andWhere('transaction.fullName ILIKE :name', {
        name: `%${searchKey}%`,
      });
    }
    if (
      transactionStatusType &&
      transactionStatusType !== TransactionStatusEnum.ALL
    ) {
      qb.andWhere('transaction.status = :staus', {
        status: transactionStatusType,
      });
    }
    if (sort && order) {
      qb.orderBy(`transaction.${sort}`, order);
    }
    qb.leftJoinAndSelect('transaction.orders', 'orders');
    qb.leftJoinAndSelect('orders.product', 'product');
    return paginate<TransactionEntity>(qb, options);
  }

  async changeStatusTransaction(id: string) {
    return this.transactionRepo.update(id, {
      status: TransactionStatusEnum.COMPLETE,
    });
  }

  findById(id: string): Promise<TransactionEntity> {
    return this.transactionRepo.findOneByOrFail({ id });
  }

  async revokeTransaction(id: string) {
    const transaction = await this.getTransactionRelations(id);
    const orderList = transaction.orders;
    const orderIds = orderList.map((item) => item.id);
    const orderProductIds = orderList.map((item) => item.product.id);

    if (transaction.status === TransactionStatusEnum.INCOMPLETE) {
      await Promise.all(
        orderProductIds.map(async (productId) => {
          await this.productService.revokeNumberProduct(productId);
          await this.productService.revokePayProduct(productId);
        }),
      );
    }

    await this.orderService.deleteManyOrder(orderIds);
    await this.deleteTransaction(id);
  }

  async deleteTransaction(id: string) {
    return this.transactionRepo.delete(id);
  }

  async getTransactionRelations(id: string) {
    return this.transactionRepo
      .createQueryBuilder('transaction')
      .where('transaction.id = :id', { id })
      .leftJoinAndSelect('transaction.orders', 'orders')
      .leftJoinAndSelect('orders.product', 'product')
      .getOne();
  }
}
