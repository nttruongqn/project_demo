import * as React from 'react';

import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../../core/formatCurrency';
import { sale } from '../../../../core/sale';
import { Product } from '../../../../models';
import { motion } from 'framer-motion';

export interface IListPhoneProps {
  phoneList: Product[]
}

export function ListPhone({ phoneList }: IListPhoneProps) {
  return (
    <>
      {/* <!-- list phone --> */}
      {phoneList.length > 0 && (<section className="my-2 max-md:px-2 md:bg-white md:px-4 md:pb-4 md:rounded-md">
        <h2 className="text-red-700 font-bold text-lg flex max-md:justify-start my-2 md:text-2xl md:hidden">Điện
          thoại di động</h2>
        <div className="flex justify-between items-center max-md:hidden">
          <h2 className="text-red-700 font-bold text-lg flex max-md:justify-start py-4 md:text-2xl">Điện thoại
            di động</h2>
          <button className="rounded border p-2 text-gray-500 font-normal text-sm" onClick={() => { window.location.href = 'dien-thoai.html' }}>Xem tất cả</button>

        </div>
        <div
          className="w-full max-md:flex max-md:items-center max-md:flex-row max-md:overflow-x-auto max-md:space-x-1 max-md:no-scrollbar max-md:overflow-y-hidden max-md:mobile-scroll md:grid md:grid-cols-5 md:gap-4">
          {phoneList.map(((item, index) => (
            <div
              className="max-md:min-w-[180px] max-md:h-[300px] p-2 bg-white md:col-span-1 md:border md:rounded cursor-pointer" key={index}>
              <Link to={`/dien-thoai/${item.slug}`}>

                <div className="max-md:h-auto">
                  <motion.img whileHover={{ scale: 0.9 }} src={item.imageUrl} alt="" />
                </div>
                <div className="py-2 px-2 w-full">
                  <div>
                    <h3 className="text-left text-sm text-ellipsis line-clamp-2"> {item.name} </h3>
                  </div>
                  <div className="flex flex-col my-2">
                    <p className="text-md text-red-700 font-bold"> {formatCurrency(sale(item.sale, item.price))}</p>
                    {item.isSale && (<p className="text-sm line-through text-gray-500"> {formatCurrency(item.price)} </p>)}
                  </div>
                </div>
              </Link>
            </div>
          )))}
        </div >
      </section >)}

    </>
  );
}
