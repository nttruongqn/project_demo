import { BaseEntity } from 'src/core/entities/base.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { ScreenEntity } from './screen.entity';
import { RearCameraEntity } from './rear-camera.entity';
import { FrontCameraEntity } from './font-camera.entity';
import { OperationSystemCPUGPUEntity } from './operation-system-cpu-gpu.entity';
import { RamRomEntity } from './ram-rom.entity';
import { ConnectEntity } from './connect.entity';
import { BatteryEntity } from './battery.entity';
import { DesignInfoEntity } from './design-info.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Entity('MobileSystem')
export class MobileSystemEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  screenId: string;

  @Column({ type: 'uuid', nullable: true })
  rearCameraId: string;

  @Column({ type: 'uuid', nullable: true })
  frontCameraId: string;

  @Column({ type: 'uuid', nullable: true })
  operationSystemCPUGPUId: string;

  @Column({ type: 'uuid', nullable: true })
  ramRomId: string;

  @Column({ type: 'uuid', nullable: true })
  connectId: string;

  @Column({ type: 'uuid', nullable: true })
  batteryId: string;

  @Column({ type: 'uuid', nullable: true })
  designInfoId: string;

  @ManyToOne(() => ScreenEntity)
  @JoinColumn({ name: 'screenId' })
  screen: ScreenEntity;

  @ManyToOne(() => RearCameraEntity)
  @JoinColumn({ name: 'rearCameraId' })
  rearCamera: RearCameraEntity;

  @ManyToOne(() => FrontCameraEntity)
  @JoinColumn({ name: 'frontCameraId' })
  frontCamera: FrontCameraEntity;

  @ManyToOne(() => OperationSystemCPUGPUEntity)
  @JoinColumn({ name: 'operationSystemCPUGPUId' })
  operationSystemCPUGPU: OperationSystemCPUGPUEntity;

  @ManyToOne(() => RamRomEntity)
  @JoinColumn({ name: 'ramRomId' })
  ramRom: RamRomEntity;

  @ManyToOne(() => ConnectEntity)
  @JoinColumn({ name: 'connectId' })
  connect: ConnectEntity;

  @ManyToOne(() => BatteryEntity)
  @JoinColumn({ name: 'batteryId' })
  battery: BatteryEntity;

  @ManyToOne(() => DesignInfoEntity)
  @JoinColumn({ name: 'designInfoId' })
  designInfo: DesignInfoEntity;

  @OneToOne(() => ProductEntity, (product) => product.mobileSystem)
  product: ProductEntity;
}
