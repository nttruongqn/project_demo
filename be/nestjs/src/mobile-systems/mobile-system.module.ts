import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobileSystemService } from './services/mobile-system.service';
import { MobileSystemEntity } from './entities/mobile-system.entity';
import { ScreenService } from './services/screen.service';
import { ScreenEntity } from './entities/screen.entity';
import { RearCameraEntity } from './entities/rear-camera.entity';
import { FrontCameraEntity } from './entities/font-camera.entity';
import { OperationSystemCPUGPUEntity } from './entities/operation-system-cpu-gpu.entity';
import { RamRomEntity } from './entities/ram-rom.entity';
import { ConnectEntity } from './entities/connect.entity';
import { RearCameraService } from './services/rear-camera.service';
import { FrontCameraService } from './services/front-camera.service';
import { OSCPUGPUService } from './services/os-cpu-gpu.service';
import { RamRomService } from './services/ram-rom.service';
import { ConnectService } from './services/connect.service';
import { DesignInfoService } from './services/design-info.service';
import { DesignInfoEntity } from './entities/design-info.entity';
import { WeightEntity } from './entities/weight.entity';
import { SizeEntity } from './entities/size.entity';
import { MaterialEntity } from './entities/material.entity';
import { WeightService } from './services/weight.service';
import { SizeService } from './services/size.service';
import { MaterialService } from './services/material.service';
import { BatteryService } from './services/battery.service';
import { WideScreenEntity } from './entities/wide-screen.entity';
import { TechnologyScreenEntity } from './entities/technology-screen.entity';
import { AdvancedShootingEntity } from './entities/advanced-shooting.entity';
import { FilmRearCameraEntity } from './entities/film-rear-camera.entity';
import { ResolutionRearCameraEntity } from './entities/resolution-rear-camera.entity';
import { ResolutionFrontCameraEntity } from './entities/resolution-front-camera.entity';
import { VideoCallEntity } from './entities/video-call.entity';
import { OperationSystemEntity } from './entities/operation-system.entity';
import { GpuEntity } from './entities/gpu.entity';
import { CpuEntity } from './entities/cpu.entity';
import { RamEntity } from './entities/ram.entity';
import { RomEntity } from './entities/rom.entity';
import { SDCardEntity } from './entities/sd-card.entity';
import { BluetoothEntity } from './entities/bluetooth.entity';
import { NetworkConnectionEntity } from './entities/network-connection.entity';
import { ChargingPortEntity } from './entities/charging-port.entity';
import { SIMEntity } from './entities/sim.entity';
import { WifiEntity } from './entities/wifi.entity';
import { GPSEntity } from './entities/gps.entity';
import { OtherConnectEntity } from './entities/other-connect.entity';
import { BatteryTypeEntity } from './entities/battery-type.entity';
import { BatteryCapacityEntity } from './entities/battery-capacity.entity';
import { BatteryTechnologyEntity } from './entities/battery-technology.entity';
import { DesignEntity } from './entities/design.entity';
import { BatteryEntity } from './entities/battery.entity';

import { WideScreenService } from './services/wide-screen.service';
import { TechnologyScreenService } from './services/technology-screen.service';
import { AdvancedShootingService } from './services/advanced-shooting.service';
import { FilmRearCameraService } from './services/film-rear-camera.service';
import { ResolutionRearCameraService } from './services/resolution-rear-camera.service';
import { ResolutionFrontCameraService } from './services/resolution-front-camera.service';
import { VideoCallService } from './services/video-call.service';
import { OperationSystemService } from './services/operation-system.service';
import { GpuService } from './services/gpu.service';
import { CpuService } from './services/cpu.service';
import { RamService } from './services/ram.service';
import { RomService } from './services/rom.service';
import { SDCardService } from './services/sd-card.service';
import { BluetoothService } from './services/bluetooth.service';
import { NetworkConnectionService } from './services/network-connection.service';
import { ChargingPortService } from './services/charging-port.service';
import { SimService } from './services/sim.service';
import { WifiService } from './services/wifi.service';
import { GpsService } from './services/gps.service';
import { OtherConnectService } from './services/other-connect.service';
import { BatteryTypeService } from './services/battery-type.service';
import { BatteryCapacityService } from './services/battery-capacity.service';
import { BatteryTechnologyService } from './services/battery-technology.service';
import { DesignService } from './services/design.service';
import { ResolutionService } from './services/resolution.service';
import { ResolutionEntity } from './entities/resolution.entity';
import { MobileSystemController } from './http/controllers/mobile-system.controller';
import { IsUniqueConstraint } from 'src/core/validation/is-unique-constraint';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MobileSystemEntity,
      ScreenEntity,
      RearCameraEntity,
      FrontCameraEntity,
      OperationSystemCPUGPUEntity,
      RamRomEntity,
      ConnectEntity,
      DesignInfoEntity,
      WeightEntity,
      SizeEntity,
      MaterialEntity,
      BatteryEntity,
      ResolutionEntity,
      WideScreenEntity,
      TechnologyScreenEntity,
      AdvancedShootingEntity,
      FilmRearCameraEntity,
      ResolutionRearCameraEntity,
      ResolutionFrontCameraEntity,
      VideoCallEntity,
      OperationSystemEntity,
      GpuEntity,
      CpuEntity,
      RamEntity,
      RomEntity,
      SDCardEntity,
      BluetoothEntity,
      NetworkConnectionEntity,
      ChargingPortEntity,
      SIMEntity,
      WifiEntity,
      GPSEntity,
      OtherConnectEntity,
      BatteryTypeEntity,
      BatteryCapacityEntity,
      BatteryTechnologyEntity,
      DesignEntity,
      WeightEntity,
      SizeEntity,
      MaterialEntity,
    ]),
  ],
  controllers: [MobileSystemController],
  providers: [
    MobileSystemService,
    ScreenService,
    RearCameraService,
    FrontCameraService,
    OSCPUGPUService,
    RamRomService,
    ConnectService,
    DesignInfoService,
    WeightService,
    SizeService,
    MaterialService,
    BatteryService,
    ResolutionService,
    WideScreenService,
    TechnologyScreenService,
    AdvancedShootingService,
    FilmRearCameraService,
    ResolutionRearCameraService,
    ResolutionFrontCameraService,
    VideoCallService,
    OperationSystemService,
    GpuService,
    CpuService,
    RamService,
    RomService,
    SDCardService,
    BluetoothService,
    NetworkConnectionService,
    ChargingPortService,
    SimService,
    WifiService,
    GpsService,
    OtherConnectService,
    BatteryTypeService,
    BatteryCapacityService,
    BatteryTechnologyService,
    DesignService,
    WeightService,
    SizeService,
    MaterialService,
    IsUniqueConstraint,
  ],
  exports: [
    MobileSystemService,
    RamService,
    RomService,
    BatteryCapacityService,
  ],
})
export class MobileSystemModule {}
