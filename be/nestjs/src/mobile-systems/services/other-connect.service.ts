import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtherConnectEntity } from '../entities/other-connect.entity';

@Injectable()
export class OtherConnectService {
  constructor(
    @InjectRepository(OtherConnectEntity)
    private otherConnectRepo: Repository<OtherConnectEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.otherConnectRepo.find();
  }
}
