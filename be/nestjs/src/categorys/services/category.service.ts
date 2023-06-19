import { CreateCategoryDto } from '../http/dtos/create-category.dto';
import slugify from 'slugify';
import { CategoryEntity } from '../entities/category.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryListDto } from '../http/dtos/category-list.dto';
import { UpdateCategoryDto } from '../http/dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async create(body: CreateCategoryDto) {
    body.slug = this.generateSlug(body.name);
    return this.categoryRepo.save(body);
  }

  private generateSlug(name: string): string {
    const slug = slugify(name, { locale: 'vi', lower: true });
    return slug;
  }

  async paginate(query: CategoryListDto): Promise<Pagination<CategoryEntity>> {
    const { limit, page, searchKey, sort, order } = query;
    const options: IPaginationOptions = {
      limit,
      page,
    };
    const qb = this.categoryRepo.createQueryBuilder('category');
    if (searchKey && searchKey.trim() !== '') {
      qb.andWhere('category.name ILIKE :name', { name: `%${searchKey}%` });
    }
    if (sort && order) {
      qb.orderBy(`category.${sort}`, order);
    }

    return paginate<CategoryEntity>(qb, options);
  }

  findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepo.find();
  }

  findById(id: string): Promise<CategoryEntity> {
    return this.categoryRepo.findOneBy({ id });
  }

  async update(id: string, data: UpdateCategoryDto) {
    if (data.name) {
      data.slug = this.generateSlug(data.name);
    }
    await this.categoryRepo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepo.delete({ id });
  }
}
