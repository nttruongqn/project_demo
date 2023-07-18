import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScreenEntity } from '../entities/screen.entity';
import { ScreenDto } from '../http/dtos/mobile-system.dto';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(ScreenEntity)
    private screenRepo: Repository<ScreenEntity>,
  ) {}

  async create(data: ScreenDto): Promise<string> {
    const screen = await this.screenRepo.save(data);
    return screen.id;
  }

  async delete(id: string) {
    await this.screenRepo.delete(id);
  }
}
