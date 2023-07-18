import { Column, ManyToOne, JoinColumn, OneToMany, Entity } from 'typeorm';
import { ResolutionFrontCameraEntity } from './resolution-front-camera.entity';
import { VideoCallEntity } from './video-call.entity';
import { MobileSystemEntity } from './mobile-system.entity';
import { BaseEntity } from 'src/core/entities/base.entity';

@Entity('FrontCamera')
export class FrontCameraEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  resolutionFrontCameraId: string;

  @Column({ type: 'uuid', nullable: true })
  videoCallId: string;

  @ManyToOne(() => ResolutionFrontCameraEntity)
  @JoinColumn({ name: 'resolutionFrontCameraId' })
  resolutionFrontCamera: ResolutionFrontCameraEntity;

  @ManyToOne(() => VideoCallEntity)
  @JoinColumn({ name: 'videoCallId' })
  videoCall: VideoCallEntity;

  @OneToMany(
    () => MobileSystemEntity,
    (mobileSystem) => mobileSystem.frontCamera,
  )
  mobileSystems: MobileSystemEntity[];
}
