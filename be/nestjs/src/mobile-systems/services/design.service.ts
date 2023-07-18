import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DesignEntity } from '../entities/design.entity';

@Injectable()
export class DesignService {
  constructor(
    @InjectRepository(DesignEntity)
    private designRepo: Repository<DesignEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.designRepo.find();
  }
}
