import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { RamEntity } from './ram.entity';
import { RomEntity } from './rom.entity';
import { MobileSystemEntity } from './mobile-system.entity';
import { SDCardEntity } from './sd-card.entity';

@Entity('RamRom')
export class RamRomEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  ramId: string;

  @Column({ type: 'uuid', nullable: true })
  romId: string;

  @Column({ type: 'uuid', nullable: true })
  sdCardId: string;

  @ManyToOne(() => RamEntity)
  @JoinColumn({ name: 'ramId' })
  ram: RamEntity;

  @ManyToOne(() => RomEntity)
  @JoinColumn({ name: 'romId' })
  rom: RomEntity;

  @ManyToOne(() => SDCardEntity)
  @JoinColumn({ name: 'sdCardId' })
  sdCard: SDCardEntity;

  @OneToMany(() => MobileSystemEntity, (mobileSystem) => mobileSystem.ramRom)
  mobileSystems: MobileSystemEntity[];
}
