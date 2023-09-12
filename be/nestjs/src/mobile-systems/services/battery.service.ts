import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BatteryDto } from '../http/dtos/mobile-system.dto';
import { BatteryEntity } from '../entities/battery.entity';
import { BatteryTechnologyService } from './battery-technology.service';

@Injectable()
export class BatteryService {
  constructor(
    @InjectRepository(BatteryEntity)
    private batteryRepo: Repository<BatteryEntity>,
    private batteryTechnologyService: BatteryTechnologyService,
  ) {}

  async create(data: BatteryDto): Promise<string> {
    let batteryTechnologyId: string;
    const { batteryCapacityId, batteryTypeId } = data;
    if (data.batteryTechnologyName) {
      batteryTechnologyId = await this.batteryTechnologyService.create(
        data.batteryTechnologyName,
      );
    }
    const batteryData = {
      batteryCapacityId,
      batteryTypeId,
      batteryTechnologyId,
    };
    const battery = await this.batteryRepo.save(batteryData);
    return battery.id;
  }

  async delete(id: string) {
    const battery = await this.batteryRepo.findOneBy({ id });
    await this.batteryRepo.delete(id);

    if (battery) {
      const { batteryTechnologyId } = battery;
      if (batteryTechnologyId) {
        await this.batteryTechnologyService.delete(batteryTechnologyId);
      }
    }
  }
}
