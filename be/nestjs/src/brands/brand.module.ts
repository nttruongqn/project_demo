/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { BrandEntity } from './entities/brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandConroller } from './http/controllers/brand.controller';
import { BrandService } from './services/brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandConroller],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandsModule {}
