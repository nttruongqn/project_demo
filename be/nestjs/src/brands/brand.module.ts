/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { BrandEntity } from './entities/brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './http/controllers/brand.controller';
import { BrandService } from './services/brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
