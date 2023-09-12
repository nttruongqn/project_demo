import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResolutionEntity } from '../entities/resolution.entity';

@Injectable()
export class ResolutionService {
  constructor(
    @InjectRepository(ResolutionEntity)
    private resolutionRepo: Repository<ResolutionEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.resolutionRepo.find();
  }

  async create(name: string): Promise<string> {
    const material = await this.resolutionRepo.save({ name });
    return material.id;
  }

  async delete(id: string) {
    await this.resolutionRepo.delete(id);
  }
}
