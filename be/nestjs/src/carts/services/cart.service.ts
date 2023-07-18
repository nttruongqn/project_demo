import { BadRequestException, Injectable } from '@nestjs/common';
import { CartDto } from '../http/dtos/cart.dto';
import { ProductService } from 'src/products/services/product.service';

@Injectable()
export class CartService {
  constructor(private productService: ProductService) {}

  async getAmountCart(cartItems: CartDto[]): Promise<any> {
    let totalPrice = 0;
    const newCartItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await this.productService.findById(item.productId);
        if (product) {
          if (product.number < item.totalQuantity) {
            throw new BadRequestException(`Số lượng ${product.name} không đủ`);
          } else {
            if (item.isSale) {
              item.totalAmount =
                item.totalQuantity *
                (product.price - product.price * (product.sale / 100));
            } else {
              item.totalAmount = item.totalQuantity * product.price;
            }
            const productQuantity = product.number - item.totalQuantity;
            const productPay = product.pay + item.totalAmount;
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
