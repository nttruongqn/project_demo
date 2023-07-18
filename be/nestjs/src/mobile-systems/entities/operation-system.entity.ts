import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { OperationSystemCPUGPUEntity } from './operation-system-cpu-gpu.entity';

@Entity('OperationSystem')
export class OperationSystemEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => OperationSystemCPUGPUEntity,
    (operationSystemCPUGPU) => operationSystemCPUGPU.operationSystem,
  )
  operationSystemCPUGPUs: OperationSystemCPUGPUEntity[];
}
