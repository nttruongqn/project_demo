import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FrontCameraDto } from '../http/dtos/mobile-system.dto';
import { FrontCameraEntity } from '../entities/font-camera.entity';

@Injectable()
export class FrontCameraService {
  constructor(
    @InjectRepository(FrontCameraEntity)
    private frontCameraRepo: Repository<FrontCameraEntity>,
  ) {}

  async create(data: FrontCameraDto): Promise<string> {
    const frontCamera = await this.frontCameraRepo.save(data);
    return frontCamera.id;
  }

  async delete(id: string) {
    await this.frontCameraRepo.delete(id);
  }
}
