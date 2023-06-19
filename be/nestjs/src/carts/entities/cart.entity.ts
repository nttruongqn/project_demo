import { BaseEntity } from 'src/core/entities/base.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('Cart')
export class CartEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'varchar' })
  productName: string;

  @Column({ type: 'varchar', nullable: true })
  productImageUrl: string;

  @Column({ type: 'int', default: 0 })
  totalQuantity: number;

  @Column({ type: 'float', default: 0 })
  totalAmount: number;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
