import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { RearCameraEntity } from './rear-camera.entity';

@Entity('ResolutionRearCamera')
export class ResolutionRearCameraEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => RearCameraEntity,
    (rearCamera) => rearCamera.resolutionRearCamera,
  )
  rearCameras: RearCameraEntity[];
}
