import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WideScreenEntity } from '../entities/wide-screen.entity';

@Injectable()
export class WideScreenService {
  constructor(
    @InjectRepository(WideScreenEntity)
    private wideScreenRepo: Repository<WideScreenEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.wideScreenRepo.find();
  }

  async create(name: string): Promise<string> {
    const wideScreen = await this.wideScreenRepo.save({ name });
    return wideScreen.id;
  }

  async delete(id: string) {
    await this.wideScreenRepo.delete(id);
  }
}
