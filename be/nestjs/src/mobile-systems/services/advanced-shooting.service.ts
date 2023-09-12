import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvancedShootingEntity } from '../entities/advanced-shooting.entity';

@Injectable()
export class AdvancedShootingService {
  constructor(
    @InjectRepository(AdvancedShootingEntity)
    private advancedShootingRepo: Repository<AdvancedShootingEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.advancedShootingRepo.find();
  }

  async create(name: string): Promise<string> {
    const advancedShooting = await this.advancedShootingRepo.save({ name });
    return advancedShooting.id;
  }

  async delete(id: string) {
    await this.advancedShootingRepo.delete(id);
  }
}
