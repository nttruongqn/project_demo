import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiPaginatedResponse } from 'src/core/repositories/api-pagination.response';
import { ProductEntity } from 'src/products/entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductListDto } from '../dtos/product-list.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductService } from 'src/products/services/product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  @ApiPaginatedResponse({
    model: ProductEntity,
    description: 'List of Product',
  })
  async getPaginateProduct(
    @Query() query: ProductListDto,
  ): Promise<Pagination<ProductEntity>> {
    return this.productService.paginate(query);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Id of Product',
  })
  async getById(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create Product',
    description: 'Create Product',
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProductDto,
  ) {
    return this.productService.create(body, file);
  }

  @Post('empty-image')
  @ApiOperation({
    summary: 'Create Product',
    description: 'Create Product',
  })
  async createWithEmptyImage(@Body() body: CreateProductDto) {
    return this.productService.createWithEmptyImage(body);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'Id of Product',
  })
  @ApiOperation({
    summary: 'Update Product',
    description: 'Update Product',
  })
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(id, file, body);
  }

  @Put(':id/empty-image')
  @ApiParam({
    name: 'id',
    description: 'Id of Product',
  })
  @ApiOperation({
    summary: 'Update Product',
    description: 'Update Product',
  })
  updateWithEmptyImage(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.updateWithEmptyImage(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Product',
    description: 'Delete Product',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of Product',
  })
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}