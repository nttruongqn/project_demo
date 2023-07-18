import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationSystemEntity } from '../entities/operation-system.entity';

@Injectable()
export class OperationSystemService {
  constructor(
    @InjectRepository(OperationSystemEntity)
    private operationSystemRepo: Repository<OperationSystemEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.operationSystemRepo.find();
  }
}
