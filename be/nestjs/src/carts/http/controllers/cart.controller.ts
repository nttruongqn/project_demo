import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from 'src/carts/services/cart.service';

@ApiTags('Cart')
@Controller('api/carts')
export class CartController {
  constructor(private cartService: CartService) {}
}
