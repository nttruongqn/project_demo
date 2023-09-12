import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { CartService } from 'src/carts/services/cart.service';
import { TransactionService } from 'src/transactions/services/transaction.service';
import { PlaceOrderDto } from '../http/dtos/place-order.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    private cartService: CartService,
    private transactionService: TransactionService,
    private mailService: MailerService,
  ) {}

  async handleOrderCart(data: PlaceOrderDto): Promise<OrderEntity[]> {
    const { totalPrice, newCartItems } = await this.cartService.getAmountCart(
      data.cartItems,
    );
    const transaction = await this.transactionService.handleTransaction(
      data.transaction,
      totalPrice,
    );
    const cartItemsToOrder = await newCartItems.map((item) => {
      return {
        transactionId: transaction.id,
        productId: item.productId,
        quantity: item.totalQuantity,
        price: item.totalAmount,
        isSale: item.isSale,
        sale: item.sale,
      };
    });
    const dataOrders = await this.orderRepo.save(cartItemsToOrder);
    const { user, orders } =
      await this.transactionService.findByIdWithRelations(transaction.id);

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Xác nhận đặt hàng thành công',
      template: 'order-success',
      context: {
        id: transaction.id,
        fullName: transaction.fullName,
        phone: transaction.phone,
        address: transaction.address,
        amount: transaction.totalAmount,
        orders,
      },
    });

    return dataOrders;
  }

  async deleteOrder(id: string) {
    return this.orderRepo.delete(id);
  }

  async deleteManyOrder(ids: string[]) {
    ids.map((item) => {
      return this.orderRepo.delete(item);
    });
  }
}
