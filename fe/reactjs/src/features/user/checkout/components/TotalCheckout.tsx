import * as React from 'react';
import { formatCurrencyReplace } from '../../../../core/formatCurrency';
import { User } from '../../../../models';
import { useFormPaymentContext } from '../../../../store/hooks';
import { TransactionModel, TransactionRequired } from '../../../../models/transaction.model';

export interface ITotalCheckoutProps {
    quantity: number;
    totalPrice: number;
    isShowOrderInformation: boolean;
    showOrderInformation: () => void;
    onSubmit: (formValues: TransactionModel) => void;
    user: User | null;
}

export function TotalCheckout({ user, quantity, totalPrice, showOrderInformation, isShowOrderInformation, onSubmit
}: ITotalCheckoutProps) {
    const { handleSubmit } = useFormPaymentContext();
    const handlePaymentFormSubmit = async (formValues: TransactionRequired) => {
       onSubmit?.(formValues as TransactionModel);
    }
    
    return (
        <div className="bg-white border rounded-xl pt-2 pb-4 px-4 w-full">
            <div className="flex flex-col">
                <div className="flex items-center gap-2 ">
                    <span className="text-[24px] text-red-700"><i
                        className="ri-money-dollar-circle-fill"></i></span>
                    <span className="text-[24px] font-bold mb-1">Tạm tính</span>
                </div>
                {
                    isShowOrderInformation && (<div className="flex flex-col">
                        <div className="flex justify-between">
                            <span className="text-sm">Tiền hàng: </span>
                            <span className="text-sm font-bold">{formatCurrencyReplace(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Phí vận chuyển: </span>
                            <span className="text-sm font-bold">0 đ</span>
                        </div>
                    </div>)
                }

                <hr className="my-2 border" />
                <div className="flex items-center justify-between">
                    <span className="text-sm">Tổng cộng:</span>
                    <span className="text-red-700 text-sm font-bold">{formatCurrencyReplace(totalPrice)}</span>
                </div>
                {quantity > 0 && !isShowOrderInformation && (<button
                    className="bg-red-700 text-white flex items-center justify-center p-2 rounded-sm mt-2 font-bold text-sm" onClick={showOrderInformation}>Đặt
                    hàng ({quantity})</button>)}
                {quantity === 0 && (<button
                    className="bg-red-500 text-white flex items-center justify-center p-2 rounded-sm mt-2 font-bold text-sm" disabled>Vui lòng mua sản phẩm trước khi đặt hàng</button>)}
                {user === null && isShowOrderInformation && (<button
                    className="bg-red-500 text-white flex items-center justify-center p-2 rounded-sm mt-2 font-bold text-sm" disabled>Vui lòng đăng nhập trước khi đặt hàng</button>)}
                {user !== null && isShowOrderInformation && (
                    <form action="" onSubmit={handleSubmit(handlePaymentFormSubmit)}>
                        <button type='submit'
                            className="w-full bg-red-700 text-white flex items-center justify-center p-2 rounded-sm mt-2 font-bold text-sm">Thanh toán
                        </button>
                    </form>)
                }
            </div>
        </div>
    );
}
