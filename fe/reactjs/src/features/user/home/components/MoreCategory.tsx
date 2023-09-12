import * as React from 'react';
import { CheckboxElements } from '../../../../models/checkbox-elements.model';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { productListActions, selectProductListFilter } from '../../productList/productList.slice';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../../models';
import { Link } from 'react-router-dom';
import { formatCurrency, formatCurrencyReplace } from '../../../../core/formatCurrency';

export interface IMoreCategoryProps {
  data: CheckboxElements;
  phoneList: Product[];
}

export function MoreCategory({ data, phoneList }: IMoreCategoryProps) {
  const { brands } = data;
  const checkboxPrices = [
    {
      label: " Dưới 2 triệu",
      value: "lessthan2m"
    },
    {
      label: "Từ 2 đến 4 triệu",
      value: "between2mand4m"
    },
    {
      label: "Từ 4 đến 7 triệu",
      value: "between4mand7m"
    },
    {
      label: "Từ 7 đến 13 triệu",
      value: "between7mand13m"
    },
    {
      label: "Trên 13 triệu",
      value: "greaterthan13m"
    },
  ]

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSelectBrand = (brandId: string) => {
    const newFilter = {
      page: 1,
      limit: 5,
      brandId,
      brandListIds: [],
      checkFilter: true
    }
    dispatch(productListActions.setFilterWithDebounce(newFilter))
    navigate(`dien-thoai.html`)
    // window.location.href = (`dien-thoai.html?brand=${brandName}`)
  }

  const handleSelectPrice = (value: string) => {
    const newFilter = {
      page: 1,
      limit: 5,
      priceListValues: [value],
      checkFilter: true
    }
    dispatch(productListActions.setFilterWithDebounce(newFilter))
    navigate(`dien-thoai.html`)
    // window.location.href = (`dien-thoai.html?brand=${brandName}`)
  }

  return (
    <div>
      <div className="grid grid-cols-7 h-full gap-4">
        <div className="col-span-2">
          <div className="border-r min-h-[369px]">
            <p className='text-sm font-bold'>Thương hiệu</p>
            <div className="grid grid-cols-2 gap-3 py-4">
              {brands.length && brands.map((item, index) => (
                <div className="col-span-2" key={index}>
                  <span className='text-sm cursor-pointer' onClick={() => handleSelectBrand(item.id)}> {item.brandName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="border-r min-h-[369px]">
            <p className='text-sm font-bold'>Bảng giá</p>
            <div className="grid grid-cols-2 gap-3 py-4">

              {checkboxPrices.length && checkboxPrices.map((item, index) => (
                <div className="col-span-2" key={index}>
                  <span className='text-sm cursor-pointer' onClick={() => handleSelectPrice(item.value)}> {item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="min-h-[369px]">
            <p className='text-sm font-bold'>Điện thoại giá sốc</p>
            <div className="flex flex-col gap-2 py-4">
              {phoneList && phoneList.map((item, index) => (
                <Link to={`/dien-thoai/${item.slug}`}>
                  <div className='flex items-center gap-3' key={index}>
                    <img src={item.imageUrl} alt="" className='w-[40px] h-[40px]' />
                    <div className="flex flex-col gap-1">
                      <span className='text-sm'>{item.name}</span>
                      <span className='text-sm text-red-700 font-bold'>{formatCurrencyReplace(item.price)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
