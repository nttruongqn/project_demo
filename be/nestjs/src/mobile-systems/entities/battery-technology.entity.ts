import { Entity, Column, OneToMany } from 'typeorm';
import { BatteryEntity } from './battery.entity';
import { BaseEntity } from 'src/core/entities/base.entity';

@Entity('BatteryTechnology')
export class BatteryTechnologyEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => BatteryEntity, (battery) => battery.batteryTechnology)
  batterys: BatteryEntity[];
}
