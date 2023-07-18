import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OperationSystemEntity } from './operation-system.entity';
import { CpuEntity } from './cpu.entity';
import { GpuEntity } from './gpu.entity';
import { MobileSystemEntity } from './mobile-system.entity';

@Entity('OperationSystemCPUGPU')
export class OperationSystemCPUGPUEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  operationSystemId: string;

  @Column({ type: 'uuid', nullable: true })
  cpuId: string;

  @Column({ type: 'uuid', nullable: true })
  gpuId: string;

  @ManyToOne(() => OperationSystemEntity)
  @JoinColumn({ name: 'operationSystemId' })
  operationSystem: OperationSystemEntity;

  @ManyToOne(() => CpuEntity)
  @JoinColumn({ name: 'cpuId' })
  cpu: CpuEntity;

  @ManyToOne(() => GpuEntity)
  @JoinColumn({ name: 'gpuId' })
  gpu: GpuEntity;

  @OneToMany(
    () => MobileSystemEntity,
    (mobileSystem) => mobileSystem.operationSystemCPUGPU,
  )
  mobileSystems: MobileSystemEntity[];
}
