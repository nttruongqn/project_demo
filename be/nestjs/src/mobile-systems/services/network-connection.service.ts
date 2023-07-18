import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NetworkConnectionEntity } from '../entities/network-connection.entity';

@Injectable()
export class NetworkConnectionService {
  constructor(
    @InjectRepository(NetworkConnectionEntity)
    private networkConnectionRepo: Repository<NetworkConnectionEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.networkConnectionRepo.find();
  }
}
