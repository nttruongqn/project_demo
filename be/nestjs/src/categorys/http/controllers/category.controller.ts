import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/categorys/services/category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { ApiPaginatedResponse } from 'src/core/repositories/api-pagination.response';
import { CategoryEntity } from 'src/categorys/entities/category.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CategoryListDto } from '../dtos/category-list.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  @ApiPaginatedResponse({
    model: CategoryEntity,
    description: 'List of category',
  })
  async getPaginateCategory(
    @Query() query: CategoryListDto,
  ): Promise<Pagination<CategoryEntity>> {
    return this.categoryService.paginate(query);
  }

  @Get('all')
  async getAllCategory(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Id of category',
  })
  async getById(@Param('id') id: string): Promise<CategoryEntity> {
    return this.categoryService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create category',
    description: 'Create category',
  })
  async create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'Id of category',
  })
  @ApiOperation({
    summary: 'Update category',
    description: 'Update category',
  })
  update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete category',
    description: 'Delete category',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of category',
  })
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
