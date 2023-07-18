import { Column, Entity, OneToMany } from 'typeorm';
import { BatteryEntity } from './battery.entity';
import { BaseEntity } from 'src/core/entities/base.entity';

@Entity('BatteryCapacity')
export class BatteryCapacityEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => BatteryEntity, (battery) => battery.batteryCapacity)
  batterys: BatteryEntity[];
}
