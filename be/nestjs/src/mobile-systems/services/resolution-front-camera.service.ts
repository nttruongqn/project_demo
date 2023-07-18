import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResolutionFrontCameraEntity } from '../entities/resolution-front-camera.entity';

@Injectable()
export class ResolutionFrontCameraService {
  constructor(
    @InjectRepository(ResolutionFrontCameraEntity)
    private resolutionFrontCameraRepo: Repository<ResolutionFrontCameraEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.resolutionFrontCameraRepo.find();
  }
}
