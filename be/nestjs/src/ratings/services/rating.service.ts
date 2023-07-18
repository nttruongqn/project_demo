import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RatingEntity } from '../entities/rating.entity';
import { CreateRatingDto } from '../http/dtos/create-rating.dto';
import { ProductService } from 'src/products/services/product.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private ratingRepo: Repository<RatingEntity>,
    private productService: ProductService,
  ) {}

  findAll(): Promise<RatingEntity[]> {
    return this.ratingRepo.find();
  }

  async create(ratingDto: CreateRatingDto) {
    const { ratingNumber, productId } = ratingDto;
    await this.productService.updateRelevantRating(productId, ratingNumber);
    return this.ratingRepo.save(ratingDto);
  }
}
