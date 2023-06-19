import { BaseEntity } from 'src/core/entities/base.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('Category')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  icon: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'int', default: 0 })
  totalProduct: number;

  @Column({ type: 'varchar', nullable: true })
  titleSeo: string;

  @Column({ type: 'varchar', nullable: true })
  descriptionSeo: string;

  @Column({ type: 'varchar', nullable: true })
  keywordSeo: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
