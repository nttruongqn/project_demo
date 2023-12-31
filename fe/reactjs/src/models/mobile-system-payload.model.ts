export interface MobileSystemPayload {
    screen: Screen;
    rearCamera: RearCamera;
    frontCamera: FrontCamera;
    operationSystemCPUGPU: OperationSystemCPUGPU;
    ramRom: RamRom;
    connect: Connect;
    battery: Battery;
    designInfo: DesignInfo;
}
    
export interface Screen {
    wideScreenName: string;
    resolutionName: string;
    technologyScreenId: string;
}
    
export interface RearCamera {
    filmRearCameraName: string;
    advancedShootingName: string;
    resolutionRearCameraName: string;
    isFlashLight: boolean;
}

export interface FrontCamera {
    resolutionFrontCameraName: string;
    videoCallName: string;
}

export interface OperationSystemCPUGPU {
    operationSystemId: string;
    cpuId: string;
    gpuId: string;
}

export interface RamRom {
    ramId: string;
    romId: string;
    sdCardId: string; 
}

export interface Connect {
    bluetoothId: string;
    mobileNetworkId: string;
    chargingPortId: string;
    networkConnectionId: string;
    simId: string;
    wifiId: string;
    gpsId: string;
    otherConnectId: string;
}

export interface Battery {
    batteryTypeId: string;
    batteryTechnologyName: string; 
    batteryCapacityId: string;
}

export interface DesignInfo {
    weightName: string;
    sizeName: string; 
    designId: string;
    materialName: string;
}