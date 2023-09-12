import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from 'src/orders/services/order.service';
import { PlaceOrderDto } from '../dtos/place-order.dto';
import { OrderEntity } from 'src/orders/entities/order.entity';

@ApiTags('Order')
@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Create order',
    description: 'Create order',
  })
  handlePlaceOrder(@Body() data: PlaceOrderDto): Promise<OrderEntity[]> {
    return this.orderService.handleOrderCart(data);
  }
}
