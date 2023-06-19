import { CartEntity } from 'src/carts/entities/cart.entity';
import { BaseEntity } from 'src/core/entities/base.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'uuid' })
  roleId: string;

  @ManyToOne(() => RoleEntity)
  role: RoleEntity;

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];

  @OneToMany(() => ProductEntity, (product) => product.user)
  transactions: TransactionEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.product)
  carts: CartEntity[];
}
