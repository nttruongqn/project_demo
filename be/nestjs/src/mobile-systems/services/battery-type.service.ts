import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BatteryTypeEntity } from '../entities/battery-type.entity';

@Injectable()
export class BatteryTypeService {
  constructor(
    @InjectRepository(BatteryTypeEntity)
    private batteryTypeRepo: Repository<BatteryTypeEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.batteryTypeRepo.find();
  }
}
