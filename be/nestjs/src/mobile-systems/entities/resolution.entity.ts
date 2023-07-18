import { BaseEntity } from 'src/core/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ScreenEntity } from './screen.entity';

@Entity('Resolution')
export class ResolutionEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => ScreenEntity, (screen) => screen.resolution)
  screens: ScreenEntity[];
}
