import * as React from 'react';
import { formatCurrency } from '../../../../core/formatCurrency';
import { sale } from '../../../../core/sale';
import { useShoppingCart } from '../../../../store/hooks';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TotalRatingStar } from './TotalRatingStar';

export interface IDetailProps {
    id: string,
    imageUrl: string,
    name: string,
    price: number;
    percentDiscount: number;
    isSale: boolean;
    number: number;
    totalRating: number;
    totalNumber: number;
}

export function Detail({ id, imageUrl, name, price, percentDiscount, isSale, number, totalRating, totalNumber }: IDetailProps) {
    const { setCartQuantity } = useShoppingCart();
    const [count, setCount] = React.useState(1);
    const navigate = useNavigate();

    const totalNumberRating = (totalNumber / totalRating).toFixed(1) ;

    const increase = () => {
        if (count < number) {
            setCount(count + 1);
        }
    };

    const decrease = () => {
        if (count > 1)
            setCount(count - 1);
    };

    const handleAddToCart = (id: string, name: string, price: number, imageUrl: string, isSale: boolean, sale: number, quantity: number, number: number) => {
        setCartQuantity(id, name, price, imageUrl, isSale, sale, quantity, number);
        navigate('/thanh-toan')
    }

    return (
        // <!-- detail product -->
        <div
            className="grid max-md:grid-cols-1 md:grid-cols-2 md:gap-4 md:rounded-lg md:bg-white md:min-h-[600px] ">
            <div className="max-md:h-[280px] max-md:py-2  flex items-center justify-center bg-white">
                <div className="h-[px] md:h-[500px] overflow-hidden ">
                    <img src={imageUrl} alt="" className="max-md:h-[250px] md:h-[500px]" />
                </div>
            </div>
            <div className="max-md:p-2 max-md:bg-white md:flex md:justify-start md:flex-col md:px-4 ">
                <h1 className="font-bold max-md:text-md mt-2 text-2xl"> {name} </h1>
                <div className="max-md:text-md flex gap-2 items-center md:py-2">
                    {totalRating > 0 ? <TotalRatingStar totalNumberRating={parseFloat(totalNumberRating)} /> :  <TotalRatingStar totalNumberRating={0}/>} <span className='bold'> | </span>
                    <span className="text-sm"> <span className="text-red-500 font-bold"> {totalRating} </span>Đánh giá</span>
                </div>
                <div className="md:hidden flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-2txl tex-red-700 font-bold">{formatCurrency(sale(percentDiscount, price))}</p>
                        {isSale && (<p className="text-sm text-slate-500 font-bold line-through">{formatCurrency(price)} </p>)}
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-sm">Trả trước chỉ từ</span>
                        <span className="text-sm font-bold">10.000.000 đ</span>
                    </div>
                </div>
                <div className="max-md:hidden md:my-4">
                    <div className="max-md:hidden text-md font-normal"><span>Giá bán</span></div>
                    <div className="flex justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-[30px] text-red-700 font-bold">{formatCurrency(sale(percentDiscount, price))}</p>
                            {isSale && (<p className="text-sm text-slate-500 font-bold line-through">{formatCurrency(price)} </p>)}
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-sm">Trả trước chỉ từ</span>
                            <span className="text-sm font-bold">10.000.000 đ</span>
                        </div>
                    </div>
                </div>

                {number > 0 && (<>
                    <div className="flex gap-1">
                        <p className='text-md'>Số lượng: </p>
                        <div className="inline-flex flex-row cursor-pointer">
                            <div className="w-[20px] h-[20px] bg-slate-300 flex items-center justify-center" onClick={() => decrease()}>-</div>
                            <div className="w-[24px] h-[20px] bg-white flex items-center justify-center border"> {count} </div>
                            <div className="w-[20px] h-[20px] bg-slate-300 flex items-center justify-center" onClick={() => increase()}>+</div>
                        </div>
                    </div>

                </>)}
                <p className="text-md">Tình trạng: {count < number && number > 0 ? (<span className="text-orange-500 font-bold"> Còn hàng </span>) : (<span className="text-red-700 font-bold"> Hết hàng </span>)} </p>

                {number === 0 || count === number ? (
                    <>
                        <button
                            className="bg-red-700 flex flex-col justify-center items-center text-white rounded-lg w-full h-[64px] my-2" disabled>
                            <p className="font-bold text-xl">HẾT HÀNG</p>
                            <p className="font-bold text-sm">Quý khách vui lòng đợi có hàng</p>
                        </button>
                    </>
                ) : (
                    <><motion.button whileTap={{ scale: 1.1 }}
                        className="bg-red-700 flex flex-col justify-center items-center text-white rounded-lg w-full h-[64px] my-2">
                        <p className="font-bold text-xl" onClick={() => handleAddToCart(id, name, price, imageUrl, isSale, percentDiscount, count, number)}>ĐẶT NGAY</p>
                        <p className="font-bold text-sm">Giao hàng tận nơi hoặc nhận tại cửa hàng</p>
                    </motion.button>
                    </>
                )}
            </div>
        </div>
    );
}
