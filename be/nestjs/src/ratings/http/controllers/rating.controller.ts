import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RatingEntity } from 'src/ratings/entities/rating.entity';
import { RatingService } from 'src/ratings/services/rating.service';
import { CreateRatingDto } from '../dtos/create-rating.dto';

@ApiTags('Rating')
@Controller('ratings')
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

  @Post()
  @ApiOperation({
    summary: 'Create a rating',
    description: 'Create a rating',
  })
  create(@Body() data: CreateRatingDto): Promise<RatingEntity> {
    return this.ratingService.create(data);
  }
}
