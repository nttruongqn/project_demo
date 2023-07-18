import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { RamRomEntity } from './ram-rom.entity';

@Entity('Rom')
export class RomEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => RamRomEntity, (ramRom) => ramRom.rom)
  ramRoms: RamRomEntity[];
}
