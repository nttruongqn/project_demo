import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BluetoothEntity } from '../entities/bluetooth.entity';

@Injectable()
export class BluetoothService {
  constructor(
    @InjectRepository(BluetoothEntity)
    private bluetoothRepo: Repository<BluetoothEntity>,
  ) {}

  async filterLabelValueItems() {
    const data = await this.findAll();
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  findAll() {
    return this.bluetoothRepo.find();
  }
}
