import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BrandEntity } from 'src/brands/entities/brand.entity';
import { BrandService } from 'src/brands/services/brand.service';

@ApiTags('Brand')
@Controller('api/brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Get all brands',
    description: 'Get all brands',
  })
  getAllBrands(): Promise<BrandEntity[]> {
    return this.brandService.findAll();
  }
}
