import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { ConnectEntity } from './connect.entity';

@Entity('NetworkConnection')
export class NetworkConnectionEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => ConnectEntity, (connect) => connect.networkConnection)
  connects: ConnectEntity[];
}
