import { UserModule } from 'src/users/user.module';
import { DashboardService } from './services/dashboard.service';
import { TransactionModule } from 'src/transactions/transaction.module';
import { CategoryModule } from 'src/categories/category.module';
import { ProductModule } from 'src/products/product.module';
import { Module } from '@nestjs/common';
import { DashboardController } from './http/controllers/dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    UserModule,
    TransactionModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
