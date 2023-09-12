import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScreenEntity } from '../entities/screen.entity';
import { ScreenDto } from '../http/dtos/mobile-system.dto';
import { ResolutionService } from './resolution.service';
import { WideScreenService } from './wide-screen.service';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(ScreenEntity)
    private screenRepo: Repository<ScreenEntity>,
    private resolutionService: ResolutionService,
    private wideScreenService: WideScreenService,
  ) {}

  async create(data: ScreenDto): Promise<string> {
    let resolutionId, wideScreenId;
    if (data.resolutionName) {
      resolutionId = await this.resolutionService.create(data.resolutionName);
    }
    if (data.wideScreenName) {
      wideScreenId = await this.wideScreenService.create(data.wideScreenName);
    }
    const screenData = {
      technologyScreenId: data.technologyScreenId,
      resolutionId,
      wideScreenId,
    };

    const screen = await this.screenRepo.save(screenData);
    return screen.id;
  }

  async delete(id: string) {
    const screen = await this.screenRepo.findOneBy({ id });
    await this.screenRepo.delete(id);

    if (screen) {
      const { resolutionId, wideScreenId } = screen;
      if (resolutionId) {
        await this.resolutionService.delete(resolutionId);
      }

      if (wideScreenId) {
        await this.wideScreenService.delete(wideScreenId);
      }
    }
  }
}
