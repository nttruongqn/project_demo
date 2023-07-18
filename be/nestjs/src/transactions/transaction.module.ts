import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionController } from './http/controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { OrderModule } from 'src/orders/order.module';
import { ProductModule } from 'src/products/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    forwardRef(() => OrderModule),
    ProductModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
