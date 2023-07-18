import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { DesignInfoEntity } from './design-info.entity';

@Entity('Design')
export class DesignEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => DesignInfoEntity, (designInfo) => designInfo.design)
  designInfos: DesignInfoEntity[];
}
