import * as React from 'react';
import { RatingStar } from './RatingStar';
import { useAuth } from '../../../../store/hooks';
import { toast } from 'react-toastify';
import { ratingApi } from '../../../../api/ratingApi';
import { TotalRatingStar } from './TotalRatingStar';

export interface IRatingNumberProps {
    setRatingNumber: (ratingNumber: number) => void;
    totalRating: number;
    totalNumber: number;
    productId: string;
}

export function RatingNumber({ setRatingNumber, totalRating, totalNumber, productId }: IRatingNumberProps) {
    const [isShowBtnRating, setIsShowBtnRating] = React.useState(false);
    const { user } = useAuth();
    const [oneStarPercent, setOneStarPercent] = React.useState(0);
    const [twoStartPercent, setTwoStarPercent] = React.useState(0);
    const [threeStarPercent, setThreeStarPercent] = React.useState(0);
    const [fourStarPercent, setFourStarPercent] = React.useState(0);
    const [fiveStarPercent, setFiveStarPercent] = React.useState(0);
    const totalNumberRating = (totalNumber / totalRating).toFixed(1) ;
    React.useEffect(() => {
        (async () => {
            if (totalRating > 0) {
                const [oneSP, twoSP, threeSP, fourSP, fiveSP] = await Promise.all(
                    await Promise.all([
                        await ratingApi.getPercentRating(productId, 1),
                        await ratingApi.getPercentRating(productId, 2),
                        await ratingApi.getPercentRating(productId, 3),
                        await ratingApi.getPercentRating(productId, 4),
                        await ratingApi.getPercentRating(productId, 5)
                    ])
                )
                setOneStarPercent(oneSP);
                setTwoStarPercent(twoSP);
                setThreeStarPercent(threeSP);
                setFourStarPercent(fourSP);
                setFiveStarPercent(fiveSP);
            }
        else {
            setOneStarPercent(0);
            setTwoStarPercent(0);
            setThreeStarPercent(0);
            setFourStarPercent(0);
            setFiveStarPercent(0);
        }
        })()
    }, [totalRating])

    const handleRatingStar = () => {
        setIsShowBtnRating(true)
        if (!user) {
            setIsShowBtnRating(false);
            toast('Vui lòng đăng nhập', {
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <>
            <h1 className="text-xl text-red-700 font-bold md:text-2xl">Đánh giá từ người dùng về sản phẩm
            </h1>
            <div className="flex justify-between my-2 items-center">
                <div className="flex gap-2 items-center justify-start">
                    <p className="text-2xl font-bold">{totalRating > 0 ? totalNumberRating : 0.0.toFixed(1)}</p>
                    {totalRating > 0 ? <TotalRatingStar totalNumberRating={parseFloat(totalNumberRating)}/> :<TotalRatingStar totalNumberRating={0} /> }
                </div>
                {!isShowBtnRating && (<button className="bg-red-700 rounded-xl h-[39px] flex items-center justify-center px-2" onClick={handleRatingStar}>
                    <span className="text-center font-bold text-md text-white"> Đánh giá </span>
                </button>)}
                {isShowBtnRating && user && <RatingStar setRatingNumber={setRatingNumber} />
                }
            </div>
            <p className="text-md">{totalRating} đánh giá</p>
            <div className="w-full">
                <div className="flex justify-start items-center w-full gap-2">
                    <div className="flex justify-start items-center gap-0.5">
                        <p className="text-md">1</p> <span className="text-yellow-500"><i
                            className="ri-star-fill"></i></span>
                    </div>
                    <div className="w-10/12 flex justify-start items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`bg-orange-300 h-2.5 rounded-full`} style={{width: `${oneStarPercent}`}}></div>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-md">{oneStarPercent}%</p>
                    </div>
                </div>

                <div className="flex justify-start items-center w-full gap-2">
                    <div className="flex justify-start items-center gap-0.5">
                        <p className="text-md">2</p> <span className="text-yellow-500"><i
                            className="ri-star-fill"></i></span>
                    </div>
                    <div className="w-10/12 flex justify-start items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`bg-orange-300 h-2.5 rounded-full`} style={{width: `${twoStartPercent}`}}></div>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-md">{twoStartPercent}%</p>
                    </div>
                </div>
                <div className="flex justify-start items-center w-full gap-2">
                    <div className="flex justify-start items-center gap-0.5">
                        <p className="text-md">3</p> <span className="text-yellow-500"><i
                            className="ri-star-fill"></i></span>
                    </div>
                    <div className="w-10/12 flex justify-start items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className={`bg-orange-300 h-2.5 rounded-full`} style={{width: `${threeStarPercent}%`}}></div>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-md">{threeStarPercent}%</p>
                    </div>
                </div>
                <div className="flex justify-start items-center w-full gap-2">
                    <div className="flex justify-start items-center gap-0.5">
                        <p className="text-md">4</p> <span className="text-yellow-500"><i
                            className="ri-star-fill"></i></span>
                    </div>
                    <div className="w-10/12 flex justify-start items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className={`bg-orange-300 h-2.5 rounded-full`} style={{width: `${fourStarPercent}%`}}></div>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-md">{fourStarPercent}%</p>
                    </div>
                </div>
                <div className="flex justify-start items-center w-full gap-2">
                    <div className="flex justify-start items-center gap-0.5">
                        <p className="text-md">5</p> <span className="text-yellow-500"><i
                            className="ri-star-fill"></i></span>
                    </div>
                    <div className="w-10/12 flex justify-start items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`bg-orange-300 h-2.5 rounded-full`}  style={{width: `${fiveStarPercent}%`}}></div>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-md">{fiveStarPercent}%</p>
                    </div>
                </div>
            </div>
        </>
    );
}
