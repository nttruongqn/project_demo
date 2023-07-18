import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './services/order.service';
import { OrderController } from './http/controllers/order.controller';
import { CartModule } from 'src/carts/cart.module';
import { TransactionModule } from 'src/transactions/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    CartModule,
    forwardRef(() => TransactionModule),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
