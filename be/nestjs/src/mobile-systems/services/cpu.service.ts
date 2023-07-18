import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CpuEntity } from '../entities/cpu.entity';

@Injectable()
export class CpuService {
  constructor(
    @InjectRepository(CpuEntity)
    private cpuRepo: Repository<CpuEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.cpuRepo.find();
  }
}
