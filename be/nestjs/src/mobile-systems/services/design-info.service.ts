import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DesignInfoDto } from '../http/dtos/mobile-system.dto';
import { DesignInfoEntity } from '../entities/design-info.entity';
import { MaterialService } from './material.service';
import { SizeService } from './size.service';
import { WeightService } from './weight.service';

@Injectable()
export class DesignInfoService {
  constructor(
    @InjectRepository(DesignInfoEntity)
    private designInfoRepo: Repository<DesignInfoEntity>,
    private materialService: MaterialService,
    private sizeService: SizeService,
    private weightService: WeightService,
  ) {}

  async create(data: DesignInfoDto): Promise<any> {
    const [materialId, sizeId, weightId] = await Promise.all([
      await this.materialService.create(data.materialName),
      await this.sizeService.create(data.sizeName),
      await this.weightService.create(data.weightName),
    ]);
    console.log(materialId, sizeId, weightId);

    const designInfoData = {
      designId: data.designId,
      materialId,
      sizeId,
      weightId,
    };

    const screen = await this.designInfoRepo.save(designInfoData);
    return screen.id;
  }

  async delete(id: string) {
    const designInfo = await this.designInfoRepo.findOneBy({ id });
    await this.designInfoRepo.delete(id);

    if (designInfo) {
      const { materialId, sizeId, weightId } = designInfo;
      await Promise.all([
        await this.materialService.delete(materialId),
        await this.sizeService.delete(sizeId),
        await this.weightService.delete(weightId),
      ]);
    }
  }
}
