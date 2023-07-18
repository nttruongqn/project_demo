import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BatteryCapacityEntity } from './battery-capacity.entity';
import { BatteryTechnologyEntity } from './battery-technology.entity';
import { BatteryTypeEntity } from './battery-type.entity';
import { MobileSystemEntity } from './mobile-system.entity';

@Entity('Battery')
export class BatteryEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  batteryTypeId: string;

  @Column({ type: 'uuid', nullable: true })
  batteryTechnologyId: string;

  @Column({ type: 'uuid', nullable: true })
  batteryCapacityId: string;

  @ManyToOne(() => BatteryTypeEntity, (batteryType) => batteryType.batterys)
  batteryType: BatteryTypeEntity;

  @ManyToOne(() => BatteryTechnologyEntity)
  @JoinColumn({ name: 'batteryTechnologyId' })
  batteryTechnology: BatteryTechnologyEntity;

  @ManyToOne(() => BatteryCapacityEntity)
  @JoinColumn({ name: 'batteryCapacityId' })
  batteryCapacity: BatteryCapacityEntity;

  @OneToMany(() => MobileSystemEntity, (mobileSystem) => mobileSystem.battery)
  mobileSystems: MobileSystemEntity[];
}
