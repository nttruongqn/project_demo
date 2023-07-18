import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChargingPortEntity } from '../entities/charging-port.entity';

@Injectable()
export class ChargingPortService {
  constructor(
    @InjectRepository(ChargingPortEntity)
    private chargingPortRepo: Repository<ChargingPortEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.chargingPortRepo.find();
  }
}
