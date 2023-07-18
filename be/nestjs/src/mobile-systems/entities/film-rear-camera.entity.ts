import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { RearCameraEntity } from './rear-camera.entity';

@Entity('FilmRearCamera')
export class FilmRearCameraEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => RearCameraEntity, (rearCamera) => rearCamera.filmRearCamera)
  rearCameras: RearCameraEntity[];
}
