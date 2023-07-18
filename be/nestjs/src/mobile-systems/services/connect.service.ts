import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConnectDto } from '../http/dtos/mobile-system.dto';
import { ConnectEntity } from '../entities/connect.entity';

@Injectable()
export class ConnectService {
  constructor(
    @InjectRepository(ConnectEntity)
    private connectRepo: Repository<ConnectEntity>,
  ) {}

  async create(data: ConnectDto): Promise<string> {
    const connect = await this.connectRepo.save(data);
    return connect.id;
  }

  async delete(id: string) {
    await this.connectRepo.delete(id);
  }
}
