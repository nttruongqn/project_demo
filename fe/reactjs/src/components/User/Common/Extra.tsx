import * as React from 'react';

export function Extra() {
    return (
        // <!-- extra -->
        <>
            <div className="bottom-tab w-full h-[52px] fixed bg-white bottom-0 left-0 right-0 md:hidden z-50 grid grid-cols-4 gap-1">
                <div className="col-span-1  flex flex-col items-center relative text-red-700">
                    <span className="text-2xl"><i className="ri-home-8-line"></i></span>
                    <span className="text-[14px] absolute bottom-1">Trang chủ</span>
                </div>
                <div className="col-span-1  flex flex-col items-center relative text-red-700">
                    <span className="text-2xl"><i className="ri-grid-fill"></i></span>
                    <span className="text-[14px] absolute bottom-1">Danh mục</span>
                </div>
                <div className="col-span-1  flex flex-col items-center relative text-red-700">
                    <span className="text-2xl"><i className="ri-newspaper-line"></i></span>
                    <span className="text-[14px] absolute bottom-1">Tin tức</span>
                </div>
                <div className="col-span-1  flex flex-col items-center relative text-red-700">
                    <span className="text-2xl"><i className="ri-user-6-fill"></i></span>
                    <span className="text-[14px] absolute bottom-1">Tài khoản</span>
                </div>
            </div>
        </>
    );
}
