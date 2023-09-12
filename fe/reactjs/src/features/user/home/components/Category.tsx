import * as React from 'react';
import IconPhone from '../../../../assests/home/icons/icon_phone.webp'
import IconLaptop from '../../../../assests/home/icons/icon_laptop.webp'
import { CheckboxElements } from '../../../../models/checkbox-elements.model';
import { Product } from '../../../../models';
import { useAppDispatch } from '../../../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { productListActions } from '../../productList/productList.slice';
import { formatCurrencyReplace } from '../../../../core/formatCurrency';
import { useButtonCategory } from '../../../../store/hooks';

export interface ICategoryProps {
    data: CheckboxElements;
    phoneListFilterPrice: Product[];
}

export function Category({ data, phoneListFilterPrice }: ICategoryProps) {
    const { brands } = data;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { showCategory } = useButtonCategory();

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

    const handleRedirectGetAll = () => {
        window.location.href = "dien-thoai.html"
    }

    const handleSelectPrice = (value: string) => {
        const newFilter = {
            page: 1,
            limit: 5,
            priceListValues: [value],
            checkFilter: true
        }
        dispatch(productListActions.setFilterWithDebounce(newFilter))
        showCategory()
        navigate(`/dien-thoai.html`)
    }

    const handleSelectBrand = (value: string) => {
        const newFilter = {
            page: 1,
            limit: 5,
            brandId: value,
            checkFilter: true
        }
        dispatch(productListActions.setFilterWithDebounce(newFilter))
        showCategory()
        navigate(`/dien-thoai.html`)
    }

    return (
        <div className=" flex w-full h-full items-center justify-between mt-1.5 px-2 gap-2 md:hidden">
            {/* <!-- Cate --> */}
            <div className="w-1/4 h-[576px] bg-white overflow-y-auto" style={{ width: ' 80px' }}>
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
            <div className="w-3/4 h-[576px] pr-2 overflow-y-auto">
                <div className="mb-2">
                    <div className="flex justify-between items-center">
                        <p className="font-bold">Thương hiệu</p>
                        <p className="text-link text-sm text-blue-500" onClick={handleRedirectGetAll}>Xem tất cả</p>
                    </div>

                    <div className="grid grid-cols-3 my-2 gap-1">
                        {brands?.map((brand, index) => (
                            <div className="col-span-1" key={index} onClick={() => handleSelectBrand(brand.id)}>
                                <img src={brand.brandImageUrl} alt="" className='border' />
                            </div>
                        ))}

                    </div>
                </div>

                <div className="mb-2">
                    <div className="flex justify-between items-center">
                        <p className="font-bold">Khoảng giá</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 py-1">
                        {checkboxPrices.length && checkboxPrices.map((item, index) => (
                            <div className="col-span-1 border rounded-md border-black p-1" key={index}>
                                <span className='text-sm cursor-pointer' onClick={() => handleSelectPrice(item.value)}> {item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-2">
                    <div className="flex justify-between items-center">
                        <p className="font-bold">Điện thoại giá sốc</p>
                    </div>
                    <div className="flex flex-col my-2 gap-4">
                        {phoneListFilterPrice && phoneListFilterPrice.map((item, index) => (
                            <Link to={`/dien-thoai/${item.slug}`}>
                                <div className="flex flex-row h-full gap-2" key={index}>
                                    <div className="w-1/4 flex items-center justify-center">
                                        <img src={item.imageUrl} alt="" className="w-[40px] h-[40px]" />
                                    </div>
                                    <div className="w-3/4 h-full flex flex-col justify-start">
                                        <div>
                                            <span className='text-sm'>{item.name}</span>
                                            <p className="text-red-700 text-sm">{formatCurrencyReplace(item.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>
            </div>

        </div>
    );
}
