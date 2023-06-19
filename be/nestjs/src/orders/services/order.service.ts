import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { CartService } from 'src/carts/services/cart.service';
import { TransactionService } from 'src/transactions/services/transaction.service';
import { PlaceOrderDto } from '../http/dtos/place-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    private cartService: CartService,
    private transactionService: TransactionService,
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
    return this.orderRepo.save(cartItemsToOrder);
  }
}
