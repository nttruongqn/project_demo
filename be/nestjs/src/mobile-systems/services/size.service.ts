import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SizeEntity } from '../entities/size.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity)
    private sizeRepo: Repository<SizeEntity>,
  ) {}

  async create(name: string): Promise<string> {
    try {
      const size = await this.sizeRepo.save({ name });
      return size.id;
    } catch (error) {
      throw new InternalServerErrorException('Không thể thêm kích thước');
    }
  }

  async delete(id: string) {
    await this.sizeRepo.delete(id);
  }
}
