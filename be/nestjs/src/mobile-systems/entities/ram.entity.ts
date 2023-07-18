import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { RamRomEntity } from './ram-rom.entity';

@Entity('Ram')
export class RamEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => RamRomEntity, (ramRom) => ramRom.ram)
  ramRoms: RamRomEntity[];
}
