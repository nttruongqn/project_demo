import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MobileSystemEntity } from '../entities/mobile-system.entity';
import { MobileSystemDto } from '../http/dtos/mobile-system.dto';
import { ScreenService } from './screen.service';
import { RearCameraService } from './rear-camera.service';
import { FrontCameraService } from './front-camera.service';
import { OSCPUGPUService } from './os-cpu-gpu.service';
import { RamRomService } from './ram-rom.service';
import { ConnectService } from './connect.service';
import { DesignInfoService } from './design-info.service';
import { AdvancedShootingService } from './advanced-shooting.service';
import { BatteryCapacityService } from './battery-capacity.service';
import { BatteryTechnologyService } from './battery-technology.service';
import { BatteryTypeService } from './battery-type.service';
import { BluetoothService } from './bluetooth.service';
import { ChargingPortService } from './charging-port.service';
import { CpuService } from './cpu.service';
import { DesignService } from './design.service';
import { FilmRearCameraService } from './film-rear-camera.service';
import { GpsService } from './gps.service';
import { GpuService } from './gpu.service';
import { NetworkConnectionService } from './network-connection.service';
import { OperationSystemService } from './operation-system.service';
import { OtherConnectService } from './other-connect.service';
import { ResolutionFrontCameraService } from './resolution-front-camera.service';
import { ResolutionRearCameraService } from './resolution-rear-camera.service';
import { SDCardService } from './sd-card.service';
import { SimService } from './sim.service';
import { TechnologyScreenService } from './technology-screen.service';
import { VideoCallService } from './video-call.service';
import { WideScreenService } from './wide-screen.service';
import { WifiService } from './wifi.service';
import { BatteryService } from './battery.service';
import { ResolutionService } from './resolution.service';
import { RamService } from './ram.service';
import { RomService } from './rom.service';

@Injectable()
export class MobileSystemService {
  constructor(
    @InjectRepository(MobileSystemEntity)
    private mobileSystemRepo: Repository<MobileSystemEntity>,
    private screenService: ScreenService,
    private rearCameraService: RearCameraService,
    private frontCameraService: FrontCameraService,
    private osCPUGPUService: OSCPUGPUService,
    private ramRomService: RamRomService,
    private connectService: ConnectService,
    private batteryService: BatteryService,
    private designInfoService: DesignInfoService,
    private wideScreenService: WideScreenService,
    private technologyScreenService: TechnologyScreenService,
    private advancedShootingService: AdvancedShootingService,
    private resolutionService: ResolutionService,
    private filmRearCameraService: FilmRearCameraService,
    private resolutionRearCameraService: ResolutionRearCameraService,
    private resolutionFrontCameraService: ResolutionFrontCameraService,
    private videoCallService: VideoCallService,
    private operationSystemService: OperationSystemService,
    private gpuService: GpuService,
    private cpuService: CpuService,
    private ramService: RamService,
    private romService: RomService,
    private sdCardService: SDCardService,
    private bluetoothService: BluetoothService,
    private networkConnectionService: NetworkConnectionService,
    private chargingPortService: ChargingPortService,
    private simService: SimService,
    private wifiService: WifiService,
    private gpsService: GpsService,
    private otherConnectService: OtherConnectService,
    private batteryTypeService: BatteryTypeService,
    private batteryCapacityService: BatteryCapacityService,
    private batteryTechnologyService: BatteryTechnologyService,
    private designService: DesignService,
  ) {}

  async createMobileSystem(data: MobileSystemDto) {
    const {
      screen,
      rearCamera,
      frontCamera,
      connect,
      ramRom,
      operationSystemCPUGPU,
      designInfo,
      battery,
    } = data;

    try {
      const [
        designInfoId,
        screenId,
        rearCameraId,
        frontCameraId,
        ramRomId,
        operationSystemCPUGPUId,
        connectId,
        batteryId,
      ] = await Promise.all([
        await this.designInfoService.create(designInfo),
        await this.screenService.create(screen),
        await this.rearCameraService.create(rearCamera),
        await this.frontCameraService.create(frontCamera),
        await this.ramRomService.create(ramRom),
        await this.osCPUGPUService.create(operationSystemCPUGPU),
        await this.connectService.create(connect),
        await this.batteryService.create(battery),
      ]);

      const mobileSystemData = {
        screenId,
        rearCameraId,
        frontCameraId,
        ramRomId,
        operationSystemCPUGPUId,
        connectId,
        designInfoId,
        batteryId,
      };

      const mobileSystem = await this.mobileSystemRepo.save(mobileSystemData);
      return mobileSystem;
    } catch (error) {
      throw new Error('Error creating mobile system: ' + error.message);
    }
  }

  async updateMobileSystem(id: string, data: MobileSystemDto) {
    const mobileSystem = await this.findOneById(id);

    if (mobileSystem) {
      const {
        screenId,
        rearCameraId,
        frontCameraId,
        operationSystemCPUGPUId,
        ramRomId,
        connectId,
        batteryId,
        designInfoId,
      } = mobileSystem;

      const deleteServices = [
        { id: screenId, service: this.screenService },
        { id: rearCameraId, service: this.rearCameraService },
        { id: frontCameraId, service: this.frontCameraService },
        { id: operationSystemCPUGPUId, service: this.osCPUGPUService },
        { id: ramRomId, service: this.ramRomService },
        { id: connectId, service: this.connectService },
        { id: batteryId, service: this.batteryService },
        { id: designInfoId, service: this.designInfoService },
      ];

      for (const { id, service } of deleteServices) {
        if (id !== null) {
          await service.delete(id);
        }
      }
      await this.mobileSystemRepo.delete(mobileSystem.id);
    }
    return this.createMobileSystem(data);
  }

  async findOneById(mobileSystemId: string) {
    return this.mobileSystemRepo.findOneBy({ id: mobileSystemId });
  }

  async getChildElements() {
    const [
      resolutionList,
      wideScreenList,
      technologyScreenList,
      advancedShootingList,
      filmRearCameraList,
      resolutionRearCameraList,
      resolutionFrontCameraList,
      videoCallList,
      operationSystemList,
      gpuList,
      cpuList,
      ramList,
      romList,
      sdCardList,
      bluetoothList,
      networkConnectionList,
      chargingPortList,
      simList,
      wifiList,
      gpsList,
      otherConnectList,
      batteryTypeList,
      batteryCapacityList,
      batteryTechnologyList,
      designList,
    ] = await Promise.all([
      await this.resolutionService.filterLabelValueItems(),
      await this.wideScreenService.filterLabelValueItems(),
      await this.technologyScreenService.filterLabelValueItems(),
      await this.advancedShootingService.filterLabelValueItems(),
      await this.filmRearCameraService.filterLabelValueItems(),
      await this.resolutionRearCameraService.filterLabelValueItems(),
      await this.resolutionFrontCameraService.filterLabelValueItems(),
      await this.videoCallService.filterLabelValueItems(),
      await this.operationSystemService.filterLabelValueItems(),
      await this.gpuService.filterLabelValueItems(),
      await this.cpuService.filterLabelValueItems(),
      await this.ramService.filterLabelValueItems(),
      await this.romService.filterLabelValueItems(),
      await this.sdCardService.filterLabelValueItems(),
      await this.bluetoothService.filterLabelValueItems(),
      await this.networkConnectionService.filterLabelValueItems(),
      await this.chargingPortService.filterLabelValueItems(),
      await this.simService.filterLabelValueItems(),
      await this.wifiService.filterLabelValueItems(),
      await this.gpsService.filterLabelValueItems(),
      await this.otherConnectService.filterLabelValueItems(),
      await this.batteryTypeService.filterLabelValueItems(),
      await this.batteryCapacityService.filterLabelValueItems(),
      await this.batteryTechnologyService.filterLabelValueItems(),
      await this.designService.filterLabelValueItems(),
    ]);

    return {
      resolutionList,
      wideScreenList,
      technologyScreenList,
      advancedShootingList,
      filmRearCameraList,
      resolutionRearCameraList,
      resolutionFrontCameraList,
      videoCallList,
      operationSystemList,
      gpuList,
      cpuList,
      ramList,
      romList,
      sdCardList,
      bluetoothList,
      networkConnectionList,
      chargingPortList,
      simList,
      wifiList,
      gpsList,
      otherConnectList,
      batteryTypeList,
      batteryCapacityList,
      batteryTechnologyList,
      designList,
    };
  }

  async delete(id: string) {
    const mobileSystem = await this.findOneById(id);
    await this.designInfoService.delete(mobileSystem.designInfoId);
  }
}
