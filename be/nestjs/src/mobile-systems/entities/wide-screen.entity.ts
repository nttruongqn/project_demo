import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { ScreenEntity } from './screen.entity';

@Entity('WideScreen')
export class WideScreenEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @OneToMany(() => ScreenEntity, (screen) => screen.wideScreen)
  screens: ScreenEntity[];
}
