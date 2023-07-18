import { BaseEntity } from 'src/core/entities/base.entity';
import { FrontCameraEntity } from './font-camera.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('VideoCall')
export class VideoCallEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => FrontCameraEntity, (frontCamera) => frontCamera.videoCall)
  frontCameras: FrontCameraEntity[];
}
