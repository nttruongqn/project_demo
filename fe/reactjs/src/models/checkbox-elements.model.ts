export interface CheckboxElements {
    batteryCapacitys: CheckboxBatteryCapacity[];
    brands: CheckboxBrand[];
    rams: CheckboxRam[];
    roms: CheckboxRom[];

}

export interface CheckboxBatteryCapacity {
    id: string;
    name: string;
}


export interface CheckboxRam {
    id: string;
    name: string;
}


export interface CheckboxRom {
    id: string;
    name: string;
}

export interface CheckboxBrand {
    id: string;
    brandName: string;
    brandImageUrl: string;
}