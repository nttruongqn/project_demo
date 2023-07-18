import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BatteryDto } from '../http/dtos/mobile-system.dto';
import { BatteryEntity } from '../entities/battery.entity';

@Injectable()
export class BatteryService {
  constructor(
    @InjectRepository(BatteryEntity)
    private batteryRepo: Repository<BatteryEntity>,
  ) {}

  async create(data: BatteryDto): Promise<string> {
    const battery = await this.batteryRepo.save(data);
    return battery.id;
  }

  async delete(id: string) {
    await this.batteryRepo.delete(id);
  }
}
