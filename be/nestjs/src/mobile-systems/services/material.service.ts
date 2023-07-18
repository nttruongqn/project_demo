import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialEntity } from '../entities/material.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(MaterialEntity)
    private materialRepo: Repository<MaterialEntity>,
  ) {}

  async create(name: string): Promise<string> {
    const material = await this.materialRepo.save({ name });
    return material.id;
  }

  async delete(id: string) {
    await this.materialRepo.delete(id);
  }

  async findByName(name: string) {
    return this.materialRepo.findOneBy({ name });
  }
}
