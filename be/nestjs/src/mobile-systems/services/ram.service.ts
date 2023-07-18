import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RamEntity } from '../entities/ram.entity';

@Injectable()
export class RamService {
  constructor(
    @InjectRepository(RamEntity)
    private ramRepo: Repository<RamEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.ramRepo.find();
  }
}
