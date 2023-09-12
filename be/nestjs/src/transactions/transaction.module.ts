import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionController } from './http/controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { OrderModule } from 'src/orders/order.module';
import { ProductModule } from 'src/products/product.module';
import { MomoController } from './http/controllers/momo.controller';
import { MomoService } from './services/momo.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    forwardRef(() => OrderModule),
    ProductModule,
    HttpModule,
  ],
  controllers: [TransactionController, MomoController],
  providers: [TransactionService, MomoService],
  exports: [TransactionService, MomoService],
})
export class TransactionModule {}
