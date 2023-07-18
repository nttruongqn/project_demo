import * as React from 'react';
import { Product } from '../../../../models';
import { formatCurrency } from '../../../../core/formatCurrency';
import { sale } from '../../../../core/sale';
import { Link } from 'react-router-dom';

export interface ListLaptopProps {
  laptopList: Product[];
}

export function ListLaptop({ laptopList }: ListLaptopProps) {
  console.log('laptop', laptopList);
  return (
    <>
      {/* <!-- list laptop --> */}
      <section className="my-2 max-md:px-2 md:bg-white md:px-4 md:pb-4 md:rounded-md">
        <h2 className="text-red-700 font-bold text-lg flex max-md:justify-start my-2 md:text-2xl md:hidden">
          Laptop</h2>
        <div className="flex justify-between items-center py-4 max-md:hidden">
          <h2 className="text-red-700 font-bold text-2xl flex max-md:justify-start">Laptop
          </h2>
          <button className="rounded border p-2 text-gray-500 font-normal text-sm">Xem tất cả</button>

        </div>
        <div
          className="w-full max-md:flex max-md:items-center max-md:flex-row max-md:overflow-x-auto max-md:space-x-1 max-md:no-scrollbar max-md:overflow-y-hidden max-md:mobile-scroll md:grid md:grid-cols-5 md:gap-4">
          {
            laptopList.length ? laptopList.map((item, index) =>
            (<div
              className="max-md:min-w-[180px] max-md:h-[300px] p-2 bg-white md:col-span-1 md:border md:rounded" key={index}>
              <Link to={`/may-tinh/${item.slug}`}>
                <div className="max-md:h-auto">
                  <img src={item.imageUrl} alt="" />
                </div>
                <div className="py-2 px-2 w-full">
                  <Link to="product-detail.html">
                    <h3 className="text-left text-sm text-ellipsis line-clamp-2"> {item.name} </h3>
                  </Link>
                  <div className="flex flex-col my-2">
                    <p className="text-md text-red-700 font-bold"> {formatCurrency(sale(item.sale, item.price))}</p>
                    {item.isSale && (<p className="text-sm line-through text-gray-500"> {formatCurrency(item.price)} </p>)}
                  </div>
                </div>
              </Link>
            </div>)
            ) : (<><span>Không có dữ liệu</span></>)}
        </div>
      </section>


    </>
  );
}
