import { BaseEntity } from 'src/core/entities/base.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('Order')
export class OrderEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  transactionId: string;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'boolean', default: false })
  isSale: boolean;

  @Column({ type: 'float', nullable: true, default: 0 })
  sale: number;

  @ManyToOne(() => TransactionEntity)
  transaction: TransactionEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;
}
