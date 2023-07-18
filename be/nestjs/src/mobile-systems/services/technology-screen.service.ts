import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnologyScreenEntity } from '../entities/technology-screen.entity';

@Injectable()
export class TechnologyScreenService {
  constructor(
    @InjectRepository(TechnologyScreenEntity)
    private technologyScreenRepo: Repository<TechnologyScreenEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.technologyScreenRepo.find();
  }
}
