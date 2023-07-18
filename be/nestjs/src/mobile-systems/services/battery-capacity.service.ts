import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BatteryCapacityEntity } from '../entities/battery-capacity.entity';

@Injectable()
export class BatteryCapacityService {
  constructor(
    @InjectRepository(BatteryCapacityEntity)
    private batteryCapacityRepo: Repository<BatteryCapacityEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.batteryCapacityRepo.find();
  }
}
