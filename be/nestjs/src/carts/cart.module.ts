import { Module } from '@nestjs/common';
import { CartEntity } from './entities/cart.entity';
import { CartController } from './http/controllers/cart.controller';
import { CartService } from './services/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/products/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), ProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
