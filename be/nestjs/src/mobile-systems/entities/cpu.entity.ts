import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { OperationSystemCPUGPUEntity } from './operation-system-cpu-gpu.entity';

@Entity('CPU')
export class CpuEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => OperationSystemCPUGPUEntity,
    (operationSystemCPUGPU) => operationSystemCPUGPU.cpu,
  )
  operationSystemCPUGPUs: OperationSystemCPUGPUEntity[];
}
