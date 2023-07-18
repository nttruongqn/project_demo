import * as React from 'react';
import { Product } from '../../../../models';
import { formatCurrency } from '../../../../core/formatCurrency';
import { sale } from '../../../../core/sale';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface IProductListDataProps {
    productList: Product[];
    loading: boolean;
}

export function ProductListData({ productList, loading }: IProductListDataProps) {
    return (
        // < !--list product-- >
        <>
            {loading === true ? (<><p>đang tải ....</p></>) : (<>
                <section className="max-md:my-1 max-md:px-2">
                    <div className="w-full grid max-md:grid-cols-2 max-md:gap-2 md:grid-cols-5 md:gap-4">
                        {productList.length > 0 && productList.map((product, index) => (
                            <div className="max-md:col-span-1 max-md:h-[300px] max-md:p-2 bg-white rounded md:border md:py-2" key={index}>
                                <Link to={`/dien-thoai/${product.slug}`}>

                                    <div className="max-md:h-auto">
                                        <motion.img whileHover={{ scale: 0.9 }} src={product.imageUrl} alt="" />                                    </div>
                                    <div className="py-2 px-2 w-full">
                                        <div>
                                            <h3 className="text-left text-sm text-ellipsis line-clamp-2"> {product.name}
                                            </h3>
                                        </div>
                                        <div className="flex flex-col my-2">
                                            <p className="text-md text-red-700 font-bold"> {formatCurrency(sale(product.sale, product.price))}</p>
                                            {product.isSale && (<p className="text-sm line-through text-gray-500"> {formatCurrency(product.price)} </p>)}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </>)}

        </>

    );
}
