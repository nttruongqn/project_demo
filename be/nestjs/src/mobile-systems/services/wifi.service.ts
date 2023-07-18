import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WifiEntity } from '../entities/wifi.entity';

@Injectable()
export class WifiService {
  constructor(
    @InjectRepository(WifiEntity)
    private wifiRepo: Repository<WifiEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.wifiRepo.find();
  }
}
