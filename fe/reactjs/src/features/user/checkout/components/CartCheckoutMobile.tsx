import * as React from 'react';
import { CartItem } from '../../../../store/ShoppingCartProvider';
import { formatCurrencyReplace } from '../../../../core/formatCurrency';
import { sale } from '../../../../core/sale';
import { TransactionModel, TransactionRequired } from '../../../../models/transaction.model';
import { PaymentCheckoutMobile } from './PaymentCheckoutMobile';
import { User } from '../../../../models';
import { useFormPaymentContext } from '../../../../store/hooks';

export interface ICartCheckoutMobileProps {
    cartItems: CartItem[];
    quantity: number;
    totalDefault: number;
    totalSale: number;
    totalPrice: number;
    increaseCartQuantity: (id: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    onSubmit: (formValues: TransactionModel) => void;
    user: User | null;
}

export function CartCheckoutMobile({ totalDefault, totalSale, totalPrice, quantity, cartItems, increaseCartQuantity, decreaseCartQuantity, removeFromCart, user, onSubmit }: ICartCheckoutMobileProps) {
    const { handleSubmit } = useFormPaymentContext();
    const handlePaymentFormSubmit = async (formValues: TransactionRequired) => {
        onSubmit?.(formValues as TransactionModel);
    }
    return (
        <div className="md:hidden">
            <div className="flex items-center gap-2">
                <span className="text-red-700 text-2xl"><i className="ri-shopping-cart-fill"></i></span>
                <p className="text-xl mb-1 font-bold">Giỏ hàng ({quantity})</p>
            </div>
            <div className="flex flex-col gap-4 my-2">
                {cartItems.length > 0 ? cartItems.map((item, index) => (
                    <div className="flex gap-2" key={index}>
                        <div className="w-1/4">
                            <img src={item.imageUrl} alt="" />
                        </div>
                        <div className="w-3/4 flex flex-col h-full">
                            <div>
                                <p className="text-md"> {item.name} </p>
                                <p className="text-sm text-red-700 font-bold">{item.isSale ? formatCurrencyReplace(sale(item.sale, item.price)) : formatCurrencyReplace(item.price)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold">Số lượng: {item.quantity}</p>
                                <span
                                    className="text-gray-500 text-md border w-[25px] h-[25px] flex items-center justify-center" onClick={() => removeFromCart(item.id)}><i
                                        className="ri-delete-bin-5-fill"></i></span>
                            </div>
                        </div>
                    </div>)) : (<><p>Giỏ hàng trống</p></>)}
            </div>
            <div className="my-3 flex items-center gap-2">
                <p><svg width="24" height="24" fill="#b91c1c" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                        d="M12 1 21.5 6.5V17.5L13 22.4211V11.4234L3.49793 5.92225 12 1ZM2.5 7.6555V17.5L11 22.4211V12.5765L2.5 7.6555Z">
                    </path>
                </svg></p>
                <span className="text-xl font-bold">Hình thức giao hàng</span>
            </div>
            <div className="px-2">
                <div className="flex item-centers mb-4 gap-1">
                    <input type="radio" name="giaohang" value="" className="text-red-600" defaultChecked/>
                    <label className="mb-0.5 text-sm">Giao hàng tiêu chuẩn</label>
                </div>
            </div>
            {user !== null && (<PaymentCheckoutMobile />)}
            <div className="my-3 flex items-center gap-2 ">
                <span className="text-2xl text-red-700"><i className="ri-bank-card-fill"></i></span>
                <span className="text-xl font-bold">Hình thức thanh toán</span>
            </div>
            <div className="px-2">
                <div className="flex item-centers mb-4 gap-1">
                    <input type="radio" name="thanhtoan" value="" className="text-red-600" defaultChecked/>
                    <label className="mb-0.5 text-sm">Thanh toán khi nhận hàng</label>
                </div>
            </div>
            <div className="my-2 flex items-center gap-2">
                <span className="text-2xl text-red-700"><i className="ri-money-dollar-circle-fill"></i></span>
                <span className="text-xl font-bold mb-1">Tạm tính</span>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                    <span>Tiền hàng:</span>
                    <span className="font-bold text-sm">{formatCurrencyReplace(totalDefault)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="font-bold text-sm">0 đ</span>
                </div>
                <div className="flex justify-between">
                    <span>Khuyến mãi:</span>
                    <span className="font-bold text-sm">{formatCurrencyReplace(totalSale)}</span>
                </div>
                <div className="flex justify-between gap-2">
                    <input type="text" className="w-4/5 h-9 border  outline-none px-2" />
                    <button
                        className="w-1/5 h-9 bg-red-700 rounded-md text-white text-sm p-2 flex items-center">Áp
                        dụng</button>
                </div>
            </div>
            <hr className="h-px my-4 bg-slate-200 border-0" />
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <span>Tổng cộng:</span>
                    <span className="font-bold text-sm text-red-700">{formatCurrencyReplace(totalPrice)}</span>
                </div>
            </div>
            <div className="flex w-full justify-between my-2 py-2">
                <button
                    className="py-2 w-[47%] flex items-center justify-center text-red-700 border-red-700 border rounded-md">Tiếp
                    tục mua hàng</button>

                {user != null && (
                    <form action="" onSubmit={handleSubmit(handlePaymentFormSubmit)} className='w-[47%]'>
                        <button
                            className="py-2 w-full flex items-center justify-center bg-red-700 text-white rounded-md">Thanh toán</button>
                    </form>
                )}

                {user == null && (<button
                    className="py-2 w-[47%] flex items-center justify-center bg-red-700 text-white rounded-md">Vui lòng đăng nhập</button>)}

            </div>
        </div>
    );
}
