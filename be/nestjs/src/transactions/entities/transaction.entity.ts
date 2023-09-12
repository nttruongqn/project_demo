import { BaseEntity } from 'src/core/entities/base.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('Transaction')
export class TransactionEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'float', default: 0 })
  totalAmount: number;

  @Column({ type: 'varchar', nullable: true })
  note: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', default: false })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ type: 'varchar', nullable: true })
  payments: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.transaction)
  orders: OrderEntity[];
}
