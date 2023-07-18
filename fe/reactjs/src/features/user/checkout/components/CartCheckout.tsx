import * as React from 'react';
import { CartItem } from '../../../../store/ShoppingCartProvider';
import { sale } from '../../../../core/sale';
import { formatCurrencyReplace } from '../../../../core/formatCurrency';

export interface ICartCheckoutProps {
    cartItems: CartItem[];
    quantity: number;
    increaseCartQuantity: (id: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
}

export function CartCheckout({ quantity, cartItems, increaseCartQuantity, decreaseCartQuantity, removeFromCart }: ICartCheckoutProps) {

    return (
        <div className="bg-white border rounded-xl py-2 px-4  flex items-center gap-2">
            <div className="w-full flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-red-700 text-[24px]"><i
                        className="ri-shopping-cart-fill"></i></span>
                    <p className="mb-1 font-bold text-[24px]">Giỏ hàng ({quantity}) </p>
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-7">
                        <div className="col-span-3 text-left text-sm text-gray-900">Tên sản phẩm</div>
                        <div className="col-span-1 text-right text-sm text-gray-900">Đơn giá</div>
                        <div className="col-span-1 text-right text-sm text-gray-900">Số lượng</div>
                        <div className="col-span-1 text-right text-sm text-gray-900">Thành tiền</div>
                        <div className="text-right text-sm text-gray-900">Thao tác</div>
                    </div>
                    <hr className="my-2" />
                    {/* list cart items */}
                    <div className="flex flex-col gap-4 min-h-[90px]">
                        {cartItems.length > 0 ? cartItems.map((item, index) => (
                            <div className="grid grid-cols-7 py-2 gap-2" key={index}>
                                <div className="col-span-3">
                                    <div className="flex gap-1 items-center">
                                        <div className="w-[20%] h-[64px]"> <img
                                            src={item.imageUrl} alt="" />
                                        </div>
                                        <div className="w-[80%]">
                                            <p className="text-gray-900 text-sm">{item.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="h-full flex items-center justify-end">
                                        <p className="text-gray-900 text-sm font-bold">{item.isSale ? formatCurrencyReplace(sale(item.sale, item.price)) : formatCurrencyReplace(item.price)}</p>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="h-full flex gap-2 items-center justify-end">
                                        <p className="text-gray-900 text-sm">{item.quantity}</p>
                                        <div className="flex flex-col gap-1">
                                            {item.number > item.quantity && (<div className='border w-4 h-4 flex items-center justify-center cursor-pointer' onClick={() => increaseCartQuantity(item.id)}><i className="ri-arrow-drop-up-fill"></i></div>)}
                                            {item.quantity >= 2 && (<div className='border w-4 h-4 flex items-center justify-center cursor-pointer' onClick={() => decreaseCartQuantity(item.id)}><i className="ri-arrow-drop-down-fill"></i></div>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="h-full flex items-center justify-end">
                                        <p className="text-sm text-red-700">{item.isSale ? formatCurrencyReplace(sale(item.sale, item.price) * item.quantity) : formatCurrencyReplace(item.price * item.quantity)} </p>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="h-full flex items-center justify-end">
                                        <p
                                            className="text-gray-500 text-md border w-[25px] h-[25px] flex items-center justify-center cursor-pointer" onClick={() => removeFromCart(item.id)}>
                                            <i className="ri-delete-bin-5-fill"></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )) : (<p>Giỏ hàng trống</p>)}

                    </div>
                </div>
            </div>
        </div>
    );
}
