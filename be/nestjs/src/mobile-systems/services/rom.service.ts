import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RomEntity } from '../entities/rom.entity';

@Injectable()
export class RomService {
  constructor(
    @InjectRepository(RomEntity)
    private romRepo: Repository<RomEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.romRepo.find();
  }
}
