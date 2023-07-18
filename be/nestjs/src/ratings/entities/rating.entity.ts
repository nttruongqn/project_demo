import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Rating')
export class RatingEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  productId: string;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  ratingContent: string;

  @Column({ type: 'int', nullable: true })
  ratingNumber: number;
}
