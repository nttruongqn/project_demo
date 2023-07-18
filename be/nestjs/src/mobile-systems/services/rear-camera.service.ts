import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RearCameraDto } from '../http/dtos/mobile-system.dto';
import { RearCameraEntity } from '../entities/rear-camera.entity';

@Injectable()
export class RearCameraService {
  constructor(
    @InjectRepository(RearCameraEntity)
    private rearCameraRepo: Repository<RearCameraEntity>,
  ) {}

  async create(data: RearCameraDto): Promise<string> {
    const rearCamera = await this.rearCameraRepo.save(data);
    return rearCamera.id;
  }

  async delete(id: string) {
    await this.rearCameraRepo.delete(id);
  }
}
