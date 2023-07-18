import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationSystemCPUGPUDto } from '../http/dtos/mobile-system.dto';
import { OperationSystemCPUGPUEntity } from '../entities/operation-system-cpu-gpu.entity';

@Injectable()
export class OSCPUGPUService {
  constructor(
    @InjectRepository(OperationSystemCPUGPUEntity)
    private osCPUGPURepo: Repository<OperationSystemCPUGPUEntity>,
  ) {}

  async create(data: OperationSystemCPUGPUDto): Promise<string> {
    const osCPUGPU = await this.osCPUGPURepo.save(data);
    return osCPUGPU.id;
  }

  async delete(id: string) {
    await this.osCPUGPURepo.delete(id);
  }
}
