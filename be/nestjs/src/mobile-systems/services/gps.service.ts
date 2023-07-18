import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GPSEntity } from '../entities/gps.entity';

@Injectable()
export class GpsService {
  constructor(
    @InjectRepository(GPSEntity)
    private gpsRepo: Repository<GPSEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.gpsRepo.find();
  }
}
