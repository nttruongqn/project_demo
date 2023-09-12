import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './http/controllers/product.controller';
import { ProductService } from './services/product.service';
import { MobileSystemModule } from 'src/mobile-systems/mobile-system.module';
import { BrandModule } from 'src/brands/brand.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    MobileSystemModule,
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
