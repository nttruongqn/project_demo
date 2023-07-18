import { BaseEntity } from 'src/core/entities/base.entity';
import { FrontCameraEntity } from './font-camera.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('ResolutionFrontCamera')
export class ResolutionFrontCameraEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => FrontCameraEntity,
    (frontCamera) => frontCamera.resolutionFrontCamera,
  )
  frontCameras: FrontCameraEntity[];
}
