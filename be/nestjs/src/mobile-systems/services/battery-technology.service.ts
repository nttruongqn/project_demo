import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BatteryTechnologyEntity } from '../entities/battery-technology.entity';

@Injectable()
export class BatteryTechnologyService {
  constructor(
    @InjectRepository(BatteryTechnologyEntity)
    private batteryTechnologyRepo: Repository<BatteryTechnologyEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.batteryTechnologyRepo.find();
  }
}
