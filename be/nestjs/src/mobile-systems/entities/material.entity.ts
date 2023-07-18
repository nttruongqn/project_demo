import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { DesignInfoEntity } from './design-info.entity';

@Entity('Material')
export class MaterialEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @OneToMany(() => DesignInfoEntity, (designInfo) => designInfo.material)
  designInfos: DesignInfoEntity[];
}
