import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { RearCameraEntity } from './rear-camera.entity';

@Entity('AdvancedShooting')
export class AdvancedShootingEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => RearCameraEntity,
    (rearCamera) => rearCamera.advancedShooting,
  )
  rearCameras: RearCameraEntity[];
}
