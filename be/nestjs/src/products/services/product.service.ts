import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import slugify from 'slugify';
import { Brackets, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../http/dtos/create-product.dto';
import { UpdateProductDto } from '../http/dtos/update-product.dto';
import { ProductListDto } from '../http/dtos/product-list.dto';
import { FileService } from 'src/files/services/file.service';
import { CategoryTypeSearchEnum } from '../enums/category-type-search.enum';
import { omit } from 'lodash';
import { MobileSystemService } from 'src/mobile-systems/services/mobile-system.service';
import { RamService } from 'src/mobile-systems/services/ram.service';
import { BatteryCapacityService } from 'src/mobile-systems/services/battery-capacity.service';
import { RomService } from 'src/mobile-systems/services/rom.service';
import { BrandService } from 'src/brands/services/brand.service';
import { BatteryCapacityListEnum } from '../enums/battery-capacity-list.enum';
import { PriceListEnum } from '../enums/price-list.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    private fileService: FileService,
    private mobileSystemService: MobileSystemService,
    private ramService: RamService,
    private romService: RomService,
    private batteryCapacityService: BatteryCapacityService,
    private brandService: BrandService,
  ) {}

  async findById(id: string): Promise<ProductEntity> {
    const qb = await this.productRepo
      .createQueryBuilder('Product')
      .leftJoinAndSelect('Product.category', 'Category')
      .leftJoinAndSelect('Product.mobileSystem', 'MobileSystem')

      .leftJoinAndSelect('MobileSystem.screen', 'Screen')
      .leftJoinAndSelect('Screen.wideScreen', 'WideScreen')
      .leftJoinAndSelect('Screen.resolution', 'Resolution')
      .leftJoinAndSelect('Screen.technologyScreen', 'TechnologyScreen')

      .leftJoinAndSelect('MobileSystem.rearCamera', 'RearCamera')
      .leftJoinAndSelect('RearCamera.filmRearCamera', 'FilmRearCamera')
      .leftJoinAndSelect(
        'RearCamera.resolutionRearCamera',
        'ResolutionRearCamera',
      )
      .leftJoinAndSelect('RearCamera.advancedShooting', 'AdvancedShooting')

      .leftJoinAndSelect('MobileSystem.frontCamera', 'FrontCamera')
      .leftJoinAndSelect(
        'FrontCamera.resolutionFrontCamera',
        'ResolutionFrontCamera',
      )
      .leftJoinAndSelect('FrontCamera.videoCall', 'VideoCall')

      .leftJoinAndSelect(
        'MobileSystem.operationSystemCPUGPU',
        'OperationSystemCPUGPU',
      )
      .leftJoinAndSelect(
        'OperationSystemCPUGPU.operationSystem',
        'OperationSystem',
      )
      .leftJoinAndSelect('OperationSystemCPUGPU.cpu', 'CPU')
      .leftJoinAndSelect('OperationSystemCPUGPU.gpu', 'GPU')

      .leftJoinAndSelect('MobileSystem.ramRom', 'RamRom')
      .leftJoinAndSelect('RamRom.ram', 'Ram')
      .leftJoinAndSelect('RamRom.rom', 'Rom')
      .leftJoinAndSelect('RamRom.sdCard', 'SDCard')

      .leftJoinAndSelect('MobileSystem.connect', 'Connect')
      .leftJoinAndSelect('Connect.bluetooth', 'Bluetooth')
      .leftJoinAndSelect('Connect.mobileNetwork', 'MobileNetwork')
      .leftJoinAndSelect('Connect.chargingPort', 'ChargingPort')
      .leftJoinAndSelect('Connect.networkConnection', 'NetworkConnection')
      .leftJoinAndSelect('Connect.sim', 'Sim')
      .leftJoinAndSelect('Connect.wifi', 'Wifi')
      .leftJoinAndSelect('Connect.gps', 'Gps')
      .leftJoinAndSelect('Connect.otherConnect', 'OtherConnect')

      .leftJoinAndSelect('MobileSystem.battery', 'Battery')
      .leftJoinAndSelect('Battery.batteryType', 'BatteryType')
      .leftJoinAndSelect('Battery.batteryTechnology', 'BatteryTechnology')
      .leftJoinAndSelect('Battery.batteryCapacity', 'BatteryCapacity')

      .leftJoinAndSelect('MobileSystem.designInfo', 'DesignInfo')
      .leftJoinAndSelect('DesignInfo.weight', 'Weight')
      .leftJoinAndSelect('DesignInfo.size', 'Size')
      .leftJoinAndSelect('DesignInfo.design', 'Design')
      .leftJoinAndSelect('DesignInfo.material', 'Material')

      .where('Product.id = :id', { id })
      .select([
        'Product',
        'Category',
        'MobileSystem.id',
        'Screen',
        'Resolution.name',
        'TechnologyScreen.name',
        'WideScreen.name',
        'RearCamera',
        'ResolutionRearCamera.name',
        'AdvancedShooting.name',
        'FilmRearCamera.name',
        'FrontCamera',
        'ResolutionFrontCamera.name',
        'VideoCall.name',
        'OperationSystemCPUGPU',
        'OperationSystem.name',
        'CPU.name',
        'GPU.name',
        'RamRom',
        'Ram.name',
        'Rom.name',
        'SDCard.name',
        'Connect',
        'Bluetooth.name',
        'MobileNetwork.name',
        'ChargingPort.name',
        'NetworkConnection.name',
        'Sim.name',
        'Wifi.name',
        'Gps.name',
        'OtherConnect.name',
        'Battery',
        'BatteryType.name',
        'BatteryTechnology.name',
        'BatteryCapacity.name',
        'DesignInfo',
        'Weight.name',
        'Material.name',
        'Size.name',
        'Design.name',
      ])
      .getOne();

    if (qb.mobileSystem !== null) {
      return {
        ...qb,
        technologyScreenId: qb.mobileSystem.screen?.technologyScreenId,
        resolutionId: qb.mobileSystem.screen?.resolutionId,
        wideScreenId: qb.mobileSystem.screen?.wideScreenId,
        advancedShootingId: qb.mobileSystem.rearCamera?.advancedShootingId,
        filmRearCameraId: qb.mobileSystem.rearCamera?.filmRearCameraId,
        resolutionRearCameraId:
          qb.mobileSystem.rearCamera?.resolutionRearCameraId,
        isFlashLight: qb.mobileSystem.rearCamera?.isFlashLight,
        resolutionFrontCameraId:
          qb.mobileSystem.frontCamera?.resolutionFrontCameraId,
        videoCallId: qb.mobileSystem.frontCamera?.videoCallId,
        operationSystemId:
          qb.mobileSystem.operationSystemCPUGPU?.operationSystemId,
        cpuId: qb.mobileSystem.operationSystemCPUGPU?.cpuId,
        gpuId: qb.mobileSystem.operationSystemCPUGPU?.gpuId,
        romId: qb.mobileSystem.ramRom?.romId,
        ramId: qb.mobileSystem.ramRom?.ramId,
        sdCardId: qb.mobileSystem.ramRom?.sdCardId,
        bluetoothId: qb.mobileSystem.connect?.bluetoothId,
        networkConnectionId: qb.mobileSystem.connect?.networkConnectionId,
        chargingPortId: qb.mobileSystem.connect?.chargingPortId,
        simId: qb.mobileSystem.connect?.simId,
        wifiId: qb.mobileSystem.connect?.wifiId,
        gpsId: qb.mobileSystem.connect?.gpsId,
        otherConnectId: qb.mobileSystem.connect?.otherConnectId,
        batteryTypeId: qb.mobileSystem.battery?.batteryTypeId,
        batteryCapacityId: qb.mobileSystem.battery?.batteryCapacityId,
        batteryTechnologyId: qb.mobileSystem.battery?.batteryTechnologyId,
        designId: qb.mobileSystem.designInfo?.designId,
        weightName: qb.mobileSystem.designInfo?.weight?.name,
        sizeName: qb.mobileSystem.designInfo?.size?.name,
        materialName: qb.mobileSystem.designInfo?.material?.name,
        wideScreenName: qb.mobileSystem.screen?.wideScreen?.name,
        resolutionName: qb.mobileSystem.screen?.resolution?.name,
        filmRearCameraName: qb.mobileSystem.rearCamera?.filmRearCamera?.name,
        advancedShootingName:
          qb.mobileSystem.rearCamera?.advancedShooting?.name,
        resolutionRearCameraName:
          qb.mobileSystem.rearCamera?.resolutionRearCamera?.name,
        resolutionFrontCameraName:
          qb.mobileSystem.frontCamera?.resolutionFrontCamera?.name,
        videoCallName: qb.mobileSystem.frontCamera?.videoCall?.name,
        batteryTechnologyName: qb.mobileSystem.battery?.batteryTechnology?.name,
      } as ProductEntity;
    }
    return qb;
  }

  findBySlug(slug: string): Promise<ProductEntity> {
    return this.productRepo.findOneByOrFail({ slug });
  }

  findByIdAndSlug(id: string, slug: string): Promise<ProductEntity> {
    return this.productRepo.findOneOrFail({
      where: { id, slug },
      relations: { category: true },
    });
  }

  findRelatedProducts(
    id: string,
    categoryId: string,
  ): Promise<ProductEntity[]> {
    return this.productRepo
      .createQueryBuilder('product')
      .where('product.id != :id', { id })
      .andWhere('product.categoryId = :categoryId', { categoryId })
      .orderBy('RANDOM()')
      .take(5)
      .getMany();
  }

  async paginate(query: ProductListDto): Promise<Pagination<ProductEntity>> {
    const {
      limit,
      page,
      searchKey,
      categoryType,
      sort,
      order,
      brandId,
      isSale,
      brandListIds,
      priceListValues,
      batteryCapacityListValues,
      ramListIds,
      romListIds,
      brandIdQueryParam,
    } = query;
    console.log(
      brandListIds,
      priceListValues,
      batteryCapacityListValues,
      ramListIds,
      romListIds,
    );
    const options: IPaginationOptions = {
      limit,
      page,
    };
    const qb = this.productRepo.createQueryBuilder('Product');

    if (categoryType && categoryType !== CategoryTypeSearchEnum.ALL) {
      qb.leftJoinAndSelect('Product.category', 'Category')
        .leftJoinAndSelect('Product.mobileSystem', 'MobileSystem')
        .leftJoinAndSelect('MobileSystem.ramRom', 'RamRom')
        .leftJoinAndSelect('MobileSystem.battery', 'Battery')
        .leftJoinAndSelect('Battery.batteryCapacity', 'BatteryCapacity')
        .andWhere('Category.name = :name', { name: categoryType });
    }
    if (searchKey && searchKey.trim() !== '') {
      qb.andWhere('Product.name ILIKE :searchKey', {
        searchKey: `%${searchKey}%`,
      });
    }
    if (sort && order) {
      qb.orderBy(`Product.${sort}`, order);
    }
    if (brandId) {
      qb.andWhere('Product.brandId = :brandId', { brandId });
    }
    if (brandIdQueryParam) {
      qb.andWhere('Product.brandId = :brandIdQueryParam', {
        brandIdQueryParam,
      });
    }
    if (isSale) {
      qb.andWhere('Product.isSale = :isSale', { isSale: true });
    }
    if (brandListIds) {
      qb.andWhere('Product.brandId IN (:...brandListIds)', { brandListIds });
    }
    if (ramListIds) {
      qb.andWhere('RamRom.ramId IN (:...ramListIds)', { ramListIds });
    }
    if (romListIds) {
      qb.andWhere('RamRom.romId IN (:...romListIds)', { romListIds });
    }
    if (batteryCapacityListValues) {
      qb.andWhere(
        new Brackets((qb) => {
          if (
            batteryCapacityListValues.includes(
              BatteryCapacityListEnum.LESSTHAN3000,
            )
          ) {
            qb.where('BatteryCapacity.name < :valueLessThan3000', {
              valueLessThan3000: 3000,
            });
          }
          if (
            batteryCapacityListValues.includes(
              BatteryCapacityListEnum.BETWEEN3000AND4000,
            )
          ) {
            qb.orWhere(
              'BatteryCapacity.name BETWEEN :minValue3K AND :maxValue4K ',
              {
                minValue3K: 3000,
                maxValue4K: 4000,
              },
            );
          }
          if (
            batteryCapacityListValues.includes(
              BatteryCapacityListEnum.BETWEEN4000AND5000,
            )
          ) {
            qb.orWhere(
              'BatteryCapacity.name BETWEEN :minValue4K AND :maxValue5K ',
              {
                minValue4K: 4000,
                maxValue5K: 5000,
              },
            );
          }
          if (
            batteryCapacityListValues.includes(
              BatteryCapacityListEnum.GREATERTHAN5000,
            )
          ) {
            qb.orWhere('BatteryCapacity.name > :valueGreaterThan5000', {
              valueGreaterThan5000: 5000,
            });
          }
        }),
      );
    }
    if (priceListValues) {
      qb.andWhere(
        new Brackets((qb) => {
          if (priceListValues.includes(PriceListEnum.LESSTHAN2M)) {
            qb.where('Product.price < :valueLessThan2M', {
              valueLessThan2M: 2000000,
            });
          }
          if (priceListValues.includes(PriceListEnum.BETWEEN2MAND4M)) {
            qb.orWhere('Product.price BETWEEN :minValue2M AND :maxValue4M ', {
              minValue2M: 2000000,
              maxValue4M: 4000000,
            });
          }
          if (priceListValues.includes(PriceListEnum.BETWEEN4MAND7M)) {
            qb.orWhere('Product.price BETWEEN :minValue4M AND :maxValue7M ', {
              minValue4M: 4000000,
              maxValue7M: 7000000,
            });
          }
          if (priceListValues.includes(PriceListEnum.BETWEEN7MAND13M)) {
            qb.orWhere('Product.price BETWEEN :minValue7M AND :maxValue13M ', {
              minValue7M: 7000000,
              maxValue13M: 13000000,
            });
          }
          if (priceListValues.includes(PriceListEnum.GREATERTHAN13M)) {
            qb.orWhere('Product.price > :valueGreaterThan13M', {
              valueGreaterThan13M: 13000000,
            });
          }
        }),
      );
    }

    return paginate(qb, options);
  }

  async create(body: CreateProductDto, file: Express.Multer.File) {
    body.slug = this.generateSlug(body.name);
    const { fileName, downloadURL } = await this.fileService.uploadFile(
      'products/images',
      file,
    );
    body.image = fileName;
    body.imageUrl = downloadURL;
    const productData = omit(body, ['mobileSystem']);
    const mobileSystem = await this.mobileSystemService.createMobileSystem(
      body.mobileSystem,
    );
    productData.mobileSystemId = mobileSystem.id;
    await this.productRepo.save(productData);
  }

  async createWithEmptyImage(body: CreateProductDto) {
    body.slug = this.generateSlug(body.name);
    const productData = omit(body, ['mobileSystem']);
    const mobileSystem = await this.mobileSystemService.createMobileSystem(
      body.mobileSystem,
    );
    productData.mobileSystemId = mobileSystem.id;
    await this.productRepo.save(productData);
  }

  private generateSlug(name: string): string {
    const slug = slugify(name, { locale: 'vi', lower: true });
    return slug;
  }

  async updateWithEmptyImage(id: string, data: UpdateProductDto) {
    if (data.name) {
      data.slug = this.generateSlug(data.name);
    }
    const productData = omit(data, ['mobileSystem']);
    const product = await this.productRepo.findOneBy({ id });
    if (!product.mobileSystemId) {
      const mobileSystem = await this.mobileSystemService.createMobileSystem(
        data.mobileSystem,
      );
      productData.mobileSystemId = mobileSystem.id;
    }
    const mobileSystem = await this.mobileSystemService.updateMobileSystem(
      product.mobileSystemId,
      data.mobileSystem,
    );
    productData.mobileSystemId = mobileSystem.id;
    await this.productRepo.update(id, productData);
  }

  async update(id: string, file: Express.Multer.File, data: UpdateProductDto) {
    if (data.name) {
      data.slug = this.generateSlug(data.name);
    }
    const { fileName, downloadURL } = await this.fileService.uploadFile(
      'products/images',
      file,
    );
    data.image = fileName;
    data.imageUrl = downloadURL;

    const product = await this.productRepo.findOneBy({ id });
    if (!product.mobileSystemId) {
      const mobileSystem = await this.mobileSystemService.createMobileSystem(
        data.mobileSystem,
      );
      product.mobileSystemId = mobileSystem.id;
    }
    const mobileSystem = await this.mobileSystemService.updateMobileSystem(
      product.mobileSystemId,
      data.mobileSystem,
    );
    const productData = omit(data, ['mobileSystem']);
    productData.mobileSystemId = mobileSystem.id;
    await this.productRepo.update(id, productData);
  }

  async updateProductQuantityAndPay(id: string, quantity: number, pay: number) {
    await this.productRepo.update(id, { number: quantity, pay });
  }

  async delete(id: string): Promise<void> {
    const product = await this.productRepo.findOneBy({ id });
    await this.mobileSystemService.delete(product.mobileSystemId);
    await this.productRepo.delete({ id });
  }

  async revokePayProduct(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['orders'],
    });

    const orders = product.orders;
    const totalPayOrders = orders.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0,
    );
    return this.productRepo.update(id, { pay: product.pay - totalPayOrders });
  }

  async revokeNumberProduct(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['orders'],
    });

    const orders = product.orders;
    const totalNumberOrders = orders.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0,
    );

    return this.productRepo.update(id, {
      number: product.number + totalNumberOrders,
    });
  }

  async updateRelevantRating(productId: string, totalNumberDto: number) {
    const product = await this.productRepo.findOneBy({ id: productId });
    await this.productRepo.update(productId, {
      totalNumber: product.totalNumber + totalNumberDto,
      totalRating: product.totalRating + 1,
    });
  }

  async getTotalNumberProducts() {
    return this.productRepo.count();
  }

  async getElementsCheckBoxProduct() {
    const [brands, batteryCapacitys, rams, roms] = await Promise.all([
      (
        await this.brandService.findAll()
      ).map(({ id, brandName, brandImageUrl }) => {
        return { id, brandName, brandImageUrl };
      }),
      (
        await this.batteryCapacityService.findAll()
      ).map(({ id, name }) => {
        return { id, name };
      }),
      (
        await this.ramService.findAll()
      ).map(({ id, name }) => {
        return { id, name };
      }),
      (
        await this.romService.findAll()
      ).map(({ id, name }) => {
        return { id, name };
      }),
      ,
    ]);
    return { brands, batteryCapacitys, rams, roms };
  }
}
