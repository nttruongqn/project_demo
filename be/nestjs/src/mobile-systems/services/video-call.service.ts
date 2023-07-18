import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoCallEntity } from '../entities/video-call.entity';

@Injectable()
export class VideoCallService {
  constructor(
    @InjectRepository(VideoCallEntity)
    private videoCallRepo: Repository<VideoCallEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.videoCallRepo.find();
  }
}
