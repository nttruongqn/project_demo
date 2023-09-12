export interface MobileSystem {
    id: string;
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
    id: string;
    wideScreen: WideScreen;
    resolution: Resolution;
    technologyScreen: TechnologyScreen
}

export interface WideScreen {
    name: string
}

export interface Resolution {
    name: string
}

export interface TechnologyScreen {
    name: string
}

export interface RearCamera {
    id: string;
    filmRearCamera: FilmRearCamera;
    advancedShooting: AdvancedShooting;
    resolutionRearCamera: ResolutionRearCamera;
}

export interface ResolutionRearCamera {
    name: string
}

export interface AdvancedShooting {
    name: string
}

export interface FilmRearCamera {
    name: string
}

export interface FrontCamera {
    id: string;
    resolutionFrontCamera: ResolutionFrontCamera;
    videoCall: VideoCall;
}

export interface ResolutionFrontCamera {
    name: string
}

export interface VideoCall {
    name: string
}

export interface OperationSystemCPUGPU {
    id: string;
    operationSystem: OperationSystem;
    cpu: CPU;
    gpu: GPU;
}

export interface OperationSystem {
    name: string
}

export interface CPU {
    name: string
}

export interface GPU {
    name: string
}

export interface RamRom {
    id: string;
    ram: Ram;
    rom: Rom;
    sdCard: SDCard;

}

export interface Ram {
    name: string
}

export interface Rom {
    name: string
}

export interface SDCard {
    name: string
}


export interface Connect {
    id: string;
    bluetooth: Bluetooth;
    mobileNetwork: MobileNetwork;
    chargingPort: ChargingPort;
    networkConnection: NetworkConnection;
    sim: Sim;
    wifi: Wifi;
    gps: Gps;
    otherConnect: otherConnect;
}

export interface Bluetooth {
    name: string
}

export interface MobileNetwork {
    name: string
}

export interface ChargingPort {
    name: string
}

export interface NetworkConnection {
    name: string
}

export interface Sim {
    name: string
}

export interface Wifi {
    name: string
}

export interface Gps {
    name: string
}

export interface otherConnect {
    name: string
}

export interface Battery {
    id: string;
    batteryType: BatteryType;
    batteryTechnology: BatteryTechnology; 
    batteryCapacity: BatteryCapacity;
}

export interface BatteryType {
    name: string;
}

export interface BatteryTechnology {
    name: string;
}

export interface BatteryCapacity  {
    name: number;
}

export interface DesignInfo {
    id: string;
    weight: Weight;
    size: Size; 
    design: Design;
    material: Material;
}


export interface Weight {
    name: string;
}

export interface Size {
    name: string;
}

export interface Design  {
    name: string;
}

export interface Material  {
    name: string;
}