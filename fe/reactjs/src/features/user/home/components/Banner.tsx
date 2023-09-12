import * as React from 'react';
import IconPhone from '../../../../assests/home/icons/icon_phone.webp'
import IconLaptop from '../../../../assests/home/icons/icon_laptop.webp'
import Banner1 from '../../../../assests/home/images/banner.webp'
import Banner2 from '../../../../assests/home/images/banner2.webp'
import Banner3 from '../../../../assests/home/images/banner3.webp'
import Banner4 from '../../../../assests/home/images/banner4.webp'
import { Link } from 'react-router-dom';
import { MoreCategory } from './MoreCategory';
import { CheckboxElements } from '../../../../models/checkbox-elements.model';
import { Product } from '../../../../models';


export interface IBannerProps {
  data: CheckboxElements;
  phoneListFilterPrice: Product[]; 
}

export function Banner({ data, phoneListFilterPrice }: IBannerProps) {
  const [isShowPhoneCategory, setIsShowPhoneCategory] = React.useState<boolean>(false);

  const redirectToNewPage = () => {
    window.location.href = 'dien-thoai.html';
  };

  const handleMouseEnterPhoneCategory = () => {
    setIsShowPhoneCategory(true);
  }

  const handleMouseLeavePhoneCategory = () => {
    setIsShowPhoneCategory(false);
  }
  return (
    <>
      {/* <!-- banner --> */}
      <section className="group my-2 max-md:px-2 w-full md:grid md:grid-cols-12 md:gap-2 relative">

        {/* <!-- banner-left --> */}
        <div className="col-span-2 max-md:hidden z-20">
          <div className="w-full flex flex-col bg-white rounded-sm" style={{ height: '410px' }} >
            <div className="flex items-center justify-between px-4 py-2 cursor-pointer  relative" onClick={redirectToNewPage} onMouseEnter={handleMouseEnterPhoneCategory} onMouseLeave={handleMouseLeavePhoneCategory}>
              <div className="flex items-center gap-1 " >
                <img src={IconPhone} alt=""/>
                <p className='text-[15px]'>Điện thoại</p>
              </div>
              <p className="text-2xl text-gray-400"><i className="ri-arrow-drop-right-line"></i></p>
            <div className="top-0 -right-2 w-5 h-full absolute"></div>
            </div>
            <div className="max-md:hidden"></div>

            {/* <Link to='may-tinh.html'>
              <div className="flex items-center justify-between px-4 py-2 cursor-pointer">
                <div className="flex items-center gap-1">
                  <img src={IconLaptop} alt="" />
                  <p>Laptop</p>
                </div>
                <p className="text-2xl text-gray-400"><i className="ri-arrow-drop-right-line"></i></p>
              </div>
            </Link>  */}
          </div>
        </div>

        {/* <!-- banner-right --> */}
        <div className="relative max-md:h-[327px] w-full md:col-span-10 h-[410px]">
          <div
            className="max-md:flex max-md:flex-col max-md:gap-1 max-md:h-full md:grid md:grid-cols-5 md:h-full gap-2">
            <div className="max-md:h-3/4 md:col-span-4 md:h-[410px]">
              <img src={Banner1} alt="" className="h-full md:object-cover md:w-full" />
            </div>
            <div
              className="flex max-md:flex-row max-md:h-1/3 gap-1 md:col-span-1 md:flex-col md:justify-between overflow-hidden">
              <img src={Banner2} alt="" className="max-md:w-1/2 md:h-[132px] " />
              <img src={Banner3} alt="" className="max-md:w-1/2 md:h-[132px]" />
              <img src={Banner4} alt="" className="max-md:hidden md:h-[132px] " />
            </div>
          </div>
          <div
            className="absolute top-0 overflow-hidden h-[410px] w-full left-0 bg-transparent group-hover:block">
          </div>
        </div>
        {isShowPhoneCategory && (<div className="max-md:hidden absolute h-[410px] grid grid-cols-12 gap-2 top-0 left-0 z-10 w-full">
          <div className="col-span-2"></div>
          <div className="col-span-10 border bg-white p-4" onMouseEnter={handleMouseEnterPhoneCategory} onMouseLeave={handleMouseLeavePhoneCategory}>
            <MoreCategory data={data} phoneList={ phoneListFilterPrice } />
          </div>
        </div>
        )}
      </section>
    </>);
}
