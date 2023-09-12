import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RearCameraDto } from '../http/dtos/mobile-system.dto';
import { RearCameraEntity } from '../entities/rear-camera.entity';
import { AdvancedShootingService } from './advanced-shooting.service';
import { FilmRearCameraService } from './film-rear-camera.service';
import { ResolutionRearCameraService } from './resolution-rear-camera.service';

@Injectable()
export class RearCameraService {
  constructor(
    @InjectRepository(RearCameraEntity)
    private rearCameraRepo: Repository<RearCameraEntity>,
    private advancedShootingService: AdvancedShootingService,
    private filmRearCameraService: FilmRearCameraService,
    private resolutionRearCameraService: ResolutionRearCameraService,
  ) {}

  async create(data: RearCameraDto): Promise<string> {
    const {
      advancedShootingName,
      filmRearCameraName,
      resolutionRearCameraName,
      isFlashLight,
    } = data;
    let advancedShootingId: string,
      filmRearCameraId: string,
      resolutionRearCameraId: string;

    if (advancedShootingName) {
      advancedShootingId = await this.advancedShootingService.create(
        advancedShootingName,
      );
    }
    if (filmRearCameraName) {
      filmRearCameraId = await this.filmRearCameraService.create(
        filmRearCameraName,
      );
    }
    if (resolutionRearCameraName) {
      resolutionRearCameraId = await this.resolutionRearCameraService.create(
        resolutionRearCameraName,
      );
    }
    const rearCameraData = {
      isFlashLight,
      advancedShootingId,
      filmRearCameraId,
      resolutionRearCameraId,
    };
    const rearCamera = await this.rearCameraRepo.save(rearCameraData);
    return rearCamera.id;
  }

  async delete(id: string) {
    const rearCamera = await this.rearCameraRepo.findOneBy({ id });
    await this.rearCameraRepo.delete(id);

    if (rearCamera) {
      const { advancedShootingId, filmRearCameraId, resolutionRearCameraId } =
        rearCamera;
      if (advancedShootingId) {
        await this.advancedShootingService.delete(advancedShootingId);
      }

      if (filmRearCameraId) {
        await this.filmRearCameraService.delete(filmRearCameraId);
      }

      if (resolutionRearCameraId) {
        await this.resolutionRearCameraService.delete(resolutionRearCameraId);
      }
    }
  }
}
