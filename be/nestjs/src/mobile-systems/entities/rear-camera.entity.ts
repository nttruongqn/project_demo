import { Column, ManyToOne, JoinColumn, Entity, OneToMany } from 'typeorm';
import { AdvancedShootingEntity } from './advanced-shooting.entity';
import { FilmRearCameraEntity } from './film-rear-camera.entity';
import { ResolutionRearCameraEntity } from './resolution-rear-camera.entity';
import { BaseEntity } from 'src/core/entities/base.entity';
import { MobileSystemEntity } from './mobile-system.entity';

@Entity('RearCamera')
export class RearCameraEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  filmRearCameraId: string;

  @Column({ type: 'uuid', nullable: true })
  resolutionRearCameraId: string;

  @Column({ type: 'uuid', nullable: true })
  advancedShootingId: string;

  @Column({ type: 'boolean', default: false })
  isFlashLight: boolean;

  @ManyToOne(() => FilmRearCameraEntity)
  @JoinColumn({ name: 'filmRearCameraId' })
  filmRearCamera: FilmRearCameraEntity;

  @ManyToOne(() => ResolutionRearCameraEntity)
  @JoinColumn({ name: 'resolutionRearCameraId' })
  resolutionRearCamera: ResolutionRearCameraEntity;

  @ManyToOne(() => AdvancedShootingEntity)
  @JoinColumn({ name: 'advancedShootingId' })
  advancedShooting: AdvancedShootingEntity;

  @OneToMany(
    () => MobileSystemEntity,
    (mobileSystem) => mobileSystem.rearCamera,
  )
  mobileSystems: MobileSystemEntity[];
}
