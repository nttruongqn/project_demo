import { CartEntity } from 'src/carts/entities/cart.entity';
import { BaseEntity } from 'src/core/entities/base.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { RatingEntity } from 'src/ratings/entities/rating.entity';
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

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;

  @Column({ type: 'varchar', nullable: true })
  passwordToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => RoleEntity)
  role: RoleEntity;

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];

  @OneToMany(() => ProductEntity, (product) => product.user)
  transactions: TransactionEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.product)
  carts: CartEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];
}
