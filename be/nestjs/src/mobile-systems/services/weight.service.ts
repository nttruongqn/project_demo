import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeightEntity } from '../entities/weight.entity';

@Injectable()
export class WeightService {
  constructor(
    @InjectRepository(WeightEntity)
    private weightRepo: Repository<WeightEntity>,
  ) {}

  async create(name: string): Promise<string> {
    try {
      const weight = await this.weightRepo.save({ name });
      return weight.id;
    } catch (error) {
      throw new InternalServerErrorException('Không thể thêm trọng lượng');
    }
  }

  async delete(id: string) {
    await this.weightRepo.delete(id);
  }
}
