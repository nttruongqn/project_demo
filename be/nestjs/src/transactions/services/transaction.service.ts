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
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    private productService: ProductService,
    private mailService: MailerService,
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
      qb.andWhere('transaction.status = :status', {
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

  async changeTransactionSuccessStatus(id: string) {
    const transaction = await this.findByIdWithRelations(id);
    const { user, orders } = transaction;
    await this.mailService.sendMail({
      to: user.email,
      subject: 'Xác nhận thanh toán thành công',
      template: 'transaction-success',
      context: {
        id: transaction.id,
        fullName: transaction.fullName,
        phone: transaction.phone,
        address: transaction.address,
        amount: transaction.totalAmount,
        orders,
      },
    });

    return this.transactionRepo.update(id, {
      status: TransactionStatusEnum.COMPLETE,
    });
  }

  async changeTransactionCancellationStatus(id: string) {
    const transaction = await this.findByIdWithRelations(id);
    await this.transactionRepo.update(id, {
      status: TransactionStatusEnum.CANCELLATION,
    });
    await this.revokeTransactionRelatedRelationships(id);
    const { user } = transaction;
    await this.mailService.sendMail({
      to: user.email,
      subject: 'Đơn hàng của bạn bị đã hủy',
      template: 'order-cancellation',
    });
  }

  findById(id: string): Promise<TransactionEntity> {
    return this.transactionRepo.findOneByOrFail({ id });
  }

  findByIdWithRelations(id: string): Promise<TransactionEntity> {
    return this.transactionRepo
      .createQueryBuilder('Transaction')
      .leftJoinAndSelect('Transaction.user', 'User')
      .leftJoinAndSelect('Transaction.orders', 'Orders')
      .leftJoinAndSelect('Orders.product', 'Product')
      .where('Transaction.id = :id', { id })
      .getOne();
  }

  async revokeTransaction(id: string) {
    await this.revokeTransactionRelatedRelationships(id);
    await this.deleteTransaction(id);
  }

  private async revokeTransactionRelatedRelationships(id: string) {
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

    if (transaction.status !== TransactionStatusEnum.CANCELLATION) {
      await this.orderService.deleteManyOrder(orderIds);
    }
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

  async getTotalNumberTransactions(): Promise<number> {
    return this.transactionRepo.count();
  }

  getTransactionListSuccessByMonth(month: string, year: string) {
    return this.transactionRepo
      .createQueryBuilder('transaction')
      .where('EXTRACT(MONTH FROM transaction."updatedAt") = :month', { month })
      .andWhere('EXTRACT(YEAR FROM transaction."updatedAt") = :year', { year })
      .andWhere('transaction.status = :status', { status: 'Đã xử lý' })
      .getCount();
  }

  getTransactionListCancellationByMonth(month: string, year: string) {
    return this.transactionRepo
      .createQueryBuilder('transaction')
      .where('EXTRACT(MONTH FROM transaction."updatedAt") = :month', { month })
      .andWhere('EXTRACT(YEAR FROM transaction."updatedAt") = :year', { year })
      .andWhere('transaction.status = :status', { status: 'Đã hủy bỏ' })
      .getCount();
  }
}
