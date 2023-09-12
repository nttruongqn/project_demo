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

@ApiTags('Product')
@Controller('api/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  @ApiOperation({
    summary: 'Get list products paginate',
    description: 'Get list products paginate',
  })
  @ApiPaginatedResponse({
    model: ProductEntity,
    description: 'List of Product',
  })
  async getPaginateProduct(
    @Query() query: ProductListDto,
  ): Promise<Pagination<ProductEntity>> {
    return this.productService.paginate(query);
  }

  @Get('elements')
  @ApiOperation({
    summary: 'Get elements for checkbox product',
    description: 'Get elements for checkbox product',
  })
  async getElementsCheckBoxProduct() {
    return this.productService.getElementsCheckBoxProduct();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by id',
    description: 'Get product by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of Product',
  })
  async getById(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.findById(id);
  }

  @Get(':id/category/:categoryId')
  @ApiOperation({
    summary: 'Get related products',
    description: 'Get related products',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of product',
  })
  @ApiParam({
    name: 'categoryId',
    description: 'Id of category',
  })
  async getRelatedProducts(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
  ): Promise<ProductEntity[]> {
    return this.productService.findRelatedProducts(id, categoryId);
  }

  @Get('slug/:slugName')
  @ApiOperation({
    summary: 'Get product by slug',
    description: 'Get product by slug',
  })
  @ApiParam({
    name: 'slug',
    description: 'Slug of Product',
  })
  async getBySlug(@Param('slugName') slug: string): Promise<ProductEntity> {
    return this.productService.findBySlug(slug);
  }

  @Get(':id/slug/:slugName')
  @ApiOperation({
    summary: 'Get product by id and slug',
    description: 'Get product by id and slug',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of Product',
  })
  @ApiParam({
    name: 'slug',
    description: 'Slug of Product',
  })
  async getByIdSlug(
    @Param('id') id: string,
    @Param('slug') slug: string,
  ): Promise<ProductEntity> {
    return this.productService.findByIdAndSlug(id, slug);
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
