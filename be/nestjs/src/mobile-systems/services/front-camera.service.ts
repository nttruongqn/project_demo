import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FrontCameraDto } from '../http/dtos/mobile-system.dto';
import { FrontCameraEntity } from '../entities/font-camera.entity';
import { ResolutionFrontCameraService } from './resolution-front-camera.service';
import { VideoCallService } from './video-call.service';

@Injectable()
export class FrontCameraService {
  constructor(
    @InjectRepository(FrontCameraEntity)
    private frontCameraRepo: Repository<FrontCameraEntity>,
    private resolutionFrontCameraService: ResolutionFrontCameraService,
    private videoCallService: VideoCallService,
  ) {}

  async create(data: FrontCameraDto): Promise<string> {
    let resolutionFrontCameraId: string, videoCallId: string;
    const { resolutionFrontCameraName, videoCallName } = data;
    if (resolutionFrontCameraName) {
      resolutionFrontCameraId = await this.resolutionFrontCameraService.create(
        resolutionFrontCameraName,
      );
    }
    if (videoCallName) {
      videoCallId = await this.videoCallService.create(videoCallName);
    }

    const frontCameraData = {
      resolutionFrontCameraId,
      videoCallId,
    };

    const frontCamera = await this.frontCameraRepo.save(frontCameraData);
    return frontCamera.id;
  }

  async delete(id: string) {
    const frontCamera = await this.frontCameraRepo.findOneBy({ id });
    await this.frontCameraRepo.delete(id);

    if (frontCamera) {
      const { resolutionFrontCameraId, videoCallId } = frontCamera;
      if (resolutionFrontCameraId) {
        await this.resolutionFrontCameraService.delete(resolutionFrontCameraId);
      }

      if (videoCallId) {
        await this.videoCallService.delete(videoCallId);
      }
    }
  }
}
