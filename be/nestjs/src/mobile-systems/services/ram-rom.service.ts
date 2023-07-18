import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RamRomEntity } from '../entities/ram-rom.entity';
import { RamRomDto } from '../http/dtos/mobile-system.dto';

@Injectable()
export class RamRomService {
  constructor(
    @InjectRepository(RamRomEntity)
    private ramRomRepo: Repository<RamRomEntity>,
  ) {}

  async create(data: RamRomDto): Promise<string> {
    const ramRom = await this.ramRomRepo.save(data);
    return ramRom.id;
  }

  async delete(id: string) {
    await this.ramRomRepo.delete(id);
  }
}
