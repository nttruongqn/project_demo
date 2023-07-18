import { Module } from '@nestjs/common';
import { RatingEntity } from './entities/rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/products/product.module';
import { RatingController } from './http/controllers/rating.controller';
import { RatingService } from './services/rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity]), ProductModule],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
