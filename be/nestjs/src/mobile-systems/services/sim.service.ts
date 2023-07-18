import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SIMEntity } from '../entities/sim.entity';

@Injectable()
export class SimService {
  constructor(
    @InjectRepository(SIMEntity)
    private simRepo: Repository<SIMEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.simRepo.find();
  }
}
