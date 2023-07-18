import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResolutionRearCameraEntity } from '../entities/resolution-rear-camera.entity';

@Injectable()
export class ResolutionRearCameraService {
  constructor(
    @InjectRepository(ResolutionRearCameraEntity)
    private resolutionRearCameraRepo: Repository<ResolutionRearCameraEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.resolutionRearCameraRepo.find();
  }
}
