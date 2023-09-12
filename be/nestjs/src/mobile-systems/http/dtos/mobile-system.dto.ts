import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ScreenDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  resolutionName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  wideScreenName?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  technologyScreenId?: string;
}

export class RearCameraDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  advancedShootingName?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  filmRearCameraName?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  resolutionRearCameraName?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isFlashLight: boolean;
}

export class FrontCameraDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  resolutionFrontCameraName?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  videoCallName?: string;
}

export class OperationSystemCPUGPUDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  operationSystemId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  cpuId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  gpuId?: string;
}

export class RamRomDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  ramId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  romId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  sdCardId?: string;
}

export class ConnectDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  bluetoothId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  mobileNetworkId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  networkConnectionId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  chargingPortId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  simId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  wifiId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  gpsId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  otherConnectId?: string;
}

export class BatteryDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  batteryTypeId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  batteryCapacityId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  batteryTechnologyName?: string;
}

export class DesignInfoDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  designId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  // @IsUnique({ tableName: 'Weight', column: 'name' })
  weightName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  // @IsUnique({ tableName: 'Size', column: 'name' })
  sizeName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  // @IsUnique({ tableName: 'Material', column: 'name' })
  materialName?: string;
}

export class MobileSystemDto {
  @ApiProperty()
  @IsOptional()
  screen?: ScreenDto;

  @ApiProperty()
  @IsOptional()
  rearCamera?: RearCameraDto;

  @ApiProperty()
  @IsOptional()
  frontCamera?: FrontCameraDto;

  @ApiProperty()
  @IsOptional()
  operationSystemCPUGPU?: OperationSystemCPUGPUDto;

  @ApiProperty()
  @IsOptional()
  ramRom?: RamRomDto;

  @ApiProperty()
  @IsOptional()
  connect?: ConnectDto;

  @ApiProperty()
  @IsOptional()
  battery?: BatteryDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => DesignInfoDto)
  designInfo?: DesignInfoDto;
}
