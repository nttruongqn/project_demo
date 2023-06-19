import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../http/dtos/create-product.dto';
import { UpdateProductDto } from '../http/dtos/update-product.dto';
import { ProductListDto } from '../http/dtos/product-list.dto';
import { FileService } from 'src/files/services/file.service';
import { CategoryTypeSearchEnum } from '../enums/category-type-search.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    private fileService: FileService,
  ) {}

  findById(id: string): Promise<ProductEntity> {
    return this.productRepo.findOneBy({ id });
  }

  async paginate(query: ProductListDto): Promise<Pagination<ProductEntity>> {
    const { limit, page, searchKey, categoryType, sort, order } = query;
    const options: IPaginationOptions = {
      limit,
      page,
    };
    const qb = this.productRepo.createQueryBuilder('product');
    if (searchKey && searchKey.trim() !== '') {
      qb.andWhere('product.name ILIKE :name', { name: `%${searchKey}%` });
    }
    if (categoryType && categoryType !== CategoryTypeSearchEnum.ALL) {
      qb.leftJoinAndSelect('product.category', 'category').andWhere(
        'category.name = :name',
        { name: categoryType },
      );
    }

    if (sort && order) {
      qb.orderBy(`product.${sort}`, order);
    }

    return paginate<ProductEntity>(qb, options);
  }

  async create(body: CreateProductDto, file: Express.Multer.File) {
    body.slug = this.generateSlug(body.name);
    const { fileName, downloadURL } = await this.fileService.uploadFile(
      'products/images',
      file,
    );
    body.image = fileName;
    body.imageUrl = downloadURL;
    console.log(fileName, downloadURL);

    return this.productRepo.save(body);
  }

  async createWithEmptyImage(body: CreateProductDto) {
    body.slug = this.generateSlug(body.name);
    return this.productRepo.save(body);
  }

  private generateSlug(name: string): string {
    const slug = slugify(name, { locale: 'vi', lower: true });
    return slug;
  }

  async updateWithEmptyImage(id: string, data: UpdateProductDto) {
    if (data.name) {
      data.slug = this.generateSlug(data.name);
    }
    await this.productRepo.update(id, data);
  }

  async update(id: string, file: Express.Multer.File, data: UpdateProductDto) {
    if (data.name) {
      data.slug = this.generateSlug(data.name);
    }
    const { fileName, downloadURL } = await this.fileService.uploadFile(
      'products/images',
      file,
    );
    data.image = fileName;
    data.imageUrl = downloadURL;
    console.log(fileName, downloadURL);

    await this.productRepo.update(id, data);
  }

  async updateProductQuantityAndPay(id: string, quantity: number, pay: number) {
    await this.productRepo.update(id, { number: quantity, pay });
  }

  async delete(id: string): Promise<void> {
    await this.productRepo.delete({ id });
  }
}
