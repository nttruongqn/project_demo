import { BaseEntity } from 'src/core/entities/base.entity';
import { WideScreenEntity } from './wide-screen.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ResolutionEntity } from './resolution.entity';
import { MobileSystemEntity } from './mobile-system.entity';
import { TechnologyScreenEntity } from './technology-screen.entity';

@Entity('Screen')
export class ScreenEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  wideScreenId: string;

  @Column({ type: 'uuid', nullable: true })
  resolutionId: string;

  @Column({ type: 'uuid', nullable: true })
  technologyScreenId: string;

  @ManyToOne(() => WideScreenEntity)
  @JoinColumn({ name: 'wideScreenId' })
  wideScreen: WideScreenEntity;

  @ManyToOne(() => ResolutionEntity)
  @JoinColumn({ name: 'resolutionId' })
  resolution: ResolutionEntity;

  @ManyToOne(() => TechnologyScreenEntity)
  @JoinColumn({ name: 'technologyScreenId' })
  technologyScreen: TechnologyScreenEntity;

  @OneToMany(() => MobileSystemEntity, (mobileSystem) => mobileSystem.screen)
  mobileSystems: MobileSystemEntity[];
}
