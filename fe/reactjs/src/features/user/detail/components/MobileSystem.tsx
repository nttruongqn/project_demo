import * as React from 'react';
import { MobileSystem } from '../../../../models/mobile-system.model';

export interface IMobileSystemProps {
    mobileSystemData: MobileSystem
}

export function MobileSystemComponent({ mobileSystemData }: IMobileSystemProps) {
    const { screen, rearCamera, frontCamera, operationSystemCPUGPU, ramRom, connect, battery, designInfo } = mobileSystemData;
    const [isShowMoreMS, setIsShowMoreMs] = React.useState(false);

    const handleChangeShowMoreMs = () => {
        setIsShowMoreMs(!isShowMoreMS)
    }

    return (
        // <!--  product system -->
        <div className="col-span-1 md:order-last ">
            <section className={!isShowMoreMS ? 'max-md:my-2 max-md:px-2 bg-white md:p-4 rounded-lg md:max-h-[850px] max-md:max-h-[600px] relative overflow-hidden' : 'max-md:my-2 max-md:px-2 bg-white md:p-4 rounded-lg h-auto relative'} >
                <div className="flex items-center gap-3">
                    <span className="max-md:text-xl text-red-700"><i className="ri-settings-2-fill"></i></span>
                    <span className="text-red-700 font-bold max-md:text-xl py-2 md:text-2xl">Thông số kĩ
                        thuật</span>
                </div>

                <div className="flex flex-col items-start justify-start py-2">
                    <div className="p text-left font-bold pb-2">Màn hình</div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Công nghệ màn hình</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{screen.technologyScreen.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Màn hình rộng</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{screen.wideScreen.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Độ phân giải</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{screen.resolution.name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start py-2">
                    <div className="p text-left font-bold pb-2">Camera sau</div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Quay phim</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{rearCamera.filmRearCamera.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Chụp nâng cao</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{rearCamera.advancedShooting.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Độ phân giải</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{rearCamera.resolutionRearCamera.name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start py-2">
                    <div className="p text-left font-bold pb-2">Camera trước</div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Độ phân giải</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{frontCamera.resolutionFrontCamera.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Video call</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{frontCamera.videoCall.name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start py-2">
                    <div className="p text-left font-bold pb-2">Hệ điều hành & CPU</div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Hệ điều hành</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{operationSystemCPUGPU.operationSystem.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">CPU</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{operationSystemCPUGPU.cpu.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">GPU</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{operationSystemCPUGPU.gpu.name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start py-2">
                    <div className="p text-left font-bold pb-2">Bộ nhớ lưu trữ</div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Rom</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{ramRom.rom.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Ram</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{ramRom.ram.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Thẻ nhớ ngoài</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{ramRom.sdCard.name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start py-2">
                    <div className="p text-left font-bold pb-2">Kết nối</div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Bluetooth</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{connect.bluetooth.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Cổng sạc</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{connect.chargingPort.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Kết nối mạng</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{connect.networkConnection.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">SIM</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{connect.sim.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Wifi</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{connect.wifi.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">GPS</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{connect.gps.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Kết nối khác</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{connect.otherConnect.name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start py-2">
                    <div className="p text-left font-bold pb-2">Pin & Sạc</div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Dung lượng pin</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{battery.batteryCapacity.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Loại pin</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{battery.batteryType.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Công nghệ pin</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{battery.batteryTechnology.name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start py-2">
                    <div className="p text-left font-bold pb-2">Thiết kế</div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Thiết kế</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{designInfo.design.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Kích thước</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{designInfo.size.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Trọng lượng</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{designInfo.weight.name}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-start odd:bg-white even:bg-gray-100 p-2 w-full">
                        <div className="w-1/2">
                            <p className="text-left">Chất liệu</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-left break-words">{designInfo.material.name}</p>
                        </div>
                    </div>
                </div>
                {!isShowMoreMS && (<div className="more-content absolute w-full bottom-0 md:left-0 flex items-center justify-center cursor-pointer">
                    <p className='text-center text-red-700 font-bold text-xl' onClick={handleChangeShowMoreMs}>Xem thêm</p>
                </div>)}
                {isShowMoreMS && (<div className="collapse-content md:absolute w-full md:bottom-0 md:left-0 flex items-center justify-center cursor-pointer">
                    <p className='text-center text-red-700 font-bold text-xl' onClick={handleChangeShowMoreMs}>Thu gọn</p>
                </div>)}
            </ section>
        </div>

    );
}
