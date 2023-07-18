import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GpuEntity } from '../entities/gpu.entity';

@Injectable()
export class GpuService {
  constructor(
    @InjectRepository(GpuEntity)
    private gpuRepo: Repository<GpuEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.gpuRepo.find();
  }
}
