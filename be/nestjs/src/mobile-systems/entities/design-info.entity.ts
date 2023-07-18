import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { DesignEntity } from './design.entity';
import { MaterialEntity } from './material.entity';
import { WeightEntity } from './weight.entity';
import { SizeEntity } from './size.entity';
import { MobileSystemEntity } from './mobile-system.entity';

@Entity('DesignInfo')
export class DesignInfoEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  weightId: string;

  @Column({ type: 'uuid', nullable: true })
  sizeId: string;

  @Column({ type: 'uuid', nullable: true })
  designId: string;

  @Column({ type: 'uuid', nullable: true })
  materialId: string;

  @ManyToOne(() => WeightEntity)
  @JoinColumn({ name: 'weightId' })
  weight: WeightEntity;

  @ManyToOne(() => SizeEntity)
  @JoinColumn({ name: 'sizeId' })
  size: SizeEntity;

  @ManyToOne(() => DesignEntity)
  @JoinColumn({ name: 'designId' })
  design: DesignEntity;

  @ManyToOne(() => MaterialEntity)
  @JoinColumn({ name: 'materialId' })
  material: MaterialEntity;

  @OneToMany(
    () => MobileSystemEntity,
    (mobileSystem) => mobileSystem.designInfo,
  )
  mobileSystems: MobileSystemEntity[];
}
