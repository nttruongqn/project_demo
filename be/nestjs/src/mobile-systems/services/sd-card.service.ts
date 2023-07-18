import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SDCardEntity } from '../entities/sd-card.entity';

@Injectable()
export class SDCardService {
  constructor(
    @InjectRepository(SDCardEntity)
    private sdCardRepo: Repository<SDCardEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.sdCardRepo.find();
  }
}
