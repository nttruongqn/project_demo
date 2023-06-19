import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { CartDto } from '../http/dtos/cart.dto';
import { ProductService } from 'src/products/services/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
    private productService: ProductService,
  ) {}

  async getAmountCart(cartItems: CartDto[]): Promise<any> {
    let totalPrice = 0;
    const newCartItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await this.productService.findById(item.productId);
        if (product) {
          if (product.number < item.totalQuantity) {
            throw new BadRequestException(`Số lượng ${product.name} không đủ`);
          } else {
            item.totalAmount = item.totalQuantity * product.price;
            console.log('amount total', item.totalAmount);
            const productQuantity = product.number - item.totalQuantity;
            const productPay = product.pay + item.totalAmount;
            console.log('productQuantity', productQuantity);
            await this.productService.updateProductQuantityAndPay(
              product.id,
              productQuantity,
              productPay,
            );
          }
        }
        totalPrice += item.totalAmount;
        return item;
      }),
    );
    return { totalPrice, newCartItems };
  }
}
