import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RatingEntity } from 'src/ratings/entities/rating.entity';
import { RatingService } from 'src/ratings/services/rating.service';
import { CreateRatingDto } from '../dtos/create-rating.dto';

@ApiTags('Rating')
@Controller('api/ratings')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Get all ratings',
    description: 'Get all ratings',
  })
  getAllRatings(): Promise<RatingEntity[]> {
    return this.ratingService.findAll();
  }

  @Get('product/:productId')
  @ApiOperation({
    summary: 'Get ratings by product id',
    description: 'Get ratings by product id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of Rating',
  })
  geRatingsByProductId(@Param('productId') id: string): Promise<RatingEntity[]> {
    return this.ratingService.findRatingsByProductId(id);
  }

  
  @Get('product/:productId/percent/:ratingNumber')
  @ApiOperation({
    summary: 'Get percent rating from rating number',
    description: 'Get percent rating from rating number',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of Rating',
  })
  @ApiParam({
    name: 'ratingNumber',
    description: '',
  })
  getPercentRating(@Param('productId') id: string, @Param('ratingNumber') ratingNumber: number): Promise<number> {
    return this.ratingService.getPercentFromRatingNumber(id, ratingNumber);
  }


  @Post()
  @ApiOperation({
    summary: 'Create a rating',
    description: 'Create a rating',
  })
  create(@Body() data: CreateRatingDto): Promise<RatingEntity> {
    return this.ratingService.create(data);
  }
}
