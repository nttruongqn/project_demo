import { BrandEntity } from 'src/brands/entities/brand.entity';
import { CartEntity } from 'src/carts/entities/cart.entity';
import { CategoryEntity } from 'src/categorys/entities/category.entity';
import { BaseEntity } from 'src/core/entities/base.entity';
import { MobileSystemEntity } from 'src/mobile-systems/entities/mobile-system.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('Product')
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  slug: string;

  @Column({ type: 'uuid', nullable: true })
  categoryId: string;

  @Column({ type: 'uuid', nullable: true })
  mobileSystemId: string;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'uuid', nullable: true })
  authId: string;

  @Column({ type: 'uuid', nullable: true })
  brandId: string;

  @Column({ type: 'boolean', default: false })
  isSale: boolean;

  @Column({ type: 'float', default: 0 })
  number: number;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isHot: boolean;

  @Column({ type: 'varchar', nullable: true })
  totalView: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', nullable: true })
  descriptionSeo: string;

  @Column({ type: 'varchar', nullable: true })
  keywordSeo: string;

  // @Column({ type: 'varchar', nullable: true })
  // titleSeo: string;

  @Column({ type: 'text', nullable: true })
  contentHTML: string;

  @Column({ type: 'text', nullable: true })
  contentMarkdown: string;

  @Column({ type: 'int', default: 0 })
  pay: number;

  @Column({ type: 'float', default: 0 })
  sale: number;

  @Column({ type: 'int', default: 0 })
  totalRating: number;

  @Column({ type: 'int', default: 0 })
  totalNumber: number;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'authId' })
  user: UserEntity;

  @ManyToOne(() => BrandEntity)
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;

  @OneToMany(() => CartEntity, (cart) => cart.product)
  carts: CartEntity[];

  @OneToMany(() => OrderEntity, (order) => order.product)
  orders: OrderEntity[];

  @OneToOne(() => MobileSystemEntity, (mobileSystem) => mobileSystem.product)
  @JoinColumn({ name: 'mobileSystemId' })
  mobileSystem: MobileSystemEntity;
}
