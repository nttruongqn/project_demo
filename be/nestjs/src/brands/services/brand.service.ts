import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandEntity } from '../entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepo: Repository<BrandEntity>,
  ) {}

  findOne(condition): Promise<BrandEntity> {
    return this.brandRepo.findOne({ where: condition });
  }

  findAll(): Promise<BrandEntity[]> {
    return this.brandRepo.find();
  }
}
