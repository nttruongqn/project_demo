import * as React from 'react';
import IconPhone from '../../../../assests/home/icons/icon_phone.webp'
import IconLaptop from '../../../../assests/home/icons/icon_laptop.webp'

export interface ICategoryProps {
}

export function Category(props: ICategoryProps) {
    return (
        <div className=" flex w-full h-full items-center justify-between mt-1.5 px-2 gap-2 md:hidden max-md:hidden">
            {/* <!-- Cate --> */}
            <div className="w-1/4 h-[576px] bg-white overflow-y-auto" style={{width:' 80px'}}>
                <div className="flex flex-col items-center">
                    <div className="flex w-full justify-center items-center py-2">
                        <div className="flex flex-col gap-1 items-center">
                            <img src={IconPhone} alt="" width="20" />
                                <span className="text-sm">Điện thoại</span>
                        </div>
                    </div>
                    {/* <div className="flex w-full justify-center items-center py-2">
                        <div className="flex flex-col gap-1 items-center">
                            <img src={IconLaptop} alt="" width="20" />
                                <span className="text-sm">Laptop</span>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* <!-- Right Cate --> */}
            <div className="w-3/4 h-[576px] pr-2">
                <div className="flex justify-between items-center">
                    <p className="font-bold">Điện thoại giá sốc</p>
                    <p className="text-link text-sm text-blue-500">Xem tất cả</p>
                </div>

                <div className="flex flex-col my-2 gap-4">
                    <div className="flex flex-row h-full gap-2">
                        <div className="w-1/4 flex items-center justify-center bg-white border">
                            <img src="/images/macbook.avif" alt="" className="rounded-lg" />
                        </div>
                        <div className="w-3/4 h-full flex flex-col justify-start">
                            <div>
                                <p>Iphone 14 pro max</p>
                                <p className="text-red-700">50.000.000</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row h-full gap-2">
                        <div className="w-1/4 flex items-center justify-center bg-white border">
                            <img src="/images/iphone-13-pro-max-128gb.webp" alt="" className="rounded-lg" />
                        </div>
                        <div className="w-3/4 h-full flex flex-col justify-start">
                            <div>
                                <p>Iphone 14 pro max</p>
                                <p className="text-red-700">50.000.000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
