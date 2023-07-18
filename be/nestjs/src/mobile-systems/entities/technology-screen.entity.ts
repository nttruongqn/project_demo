import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { ScreenEntity } from './screen.entity';

@Entity('TechnologyScreen')
export class TechnologyScreenEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @OneToMany(() => ScreenEntity, (screen) => screen.technologyScreen)
  screens: ScreenEntity[];
}
