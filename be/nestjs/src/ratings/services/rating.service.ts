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

  findRatingsByProductId(productId: string): Promise<RatingEntity[]> {
    return this.ratingRepo.findBy({productId});
  }

  async getPercentFromRatingNumber(productId: string, ratingNumber: number): Promise<number> {
    const countAllRatingNumber = await this.getCountAllRatingNumber(productId);
    const countRatingFromRatingNumber = await this.getCountFromRatingNumber(productId, ratingNumber);
    const ratingPercent = countRatingFromRatingNumber / countAllRatingNumber * 100;
    return ratingPercent;
  }

  private getCountAllRatingNumber(productId: string) {
    return this.ratingRepo.createQueryBuilder('rating')
    .select('COUNT(rating.id)')
    .where('rating.productId = :productId', {productId})
    .getCount()
  }

  private getCountFromRatingNumber(productId: string, ratingNumber: number) {
    return this.ratingRepo.createQueryBuilder('rating')
    .select('COUNT(rating.id)')
    .where('rating.productId = :productId', {productId})
    .andWhere('rating.ratingNumber = :ratingNumber', {ratingNumber})
    .getCount()
  }

  async create(ratingDto: CreateRatingDto) {
    const { ratingNumber, productId } = ratingDto;
    await this.productService.updateRelevantRating(productId, ratingNumber);
    return this.ratingRepo.save(ratingDto);
  }
}
