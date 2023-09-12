import * as React from 'react';
import defaultAvartar from '../../../../assests/home/icons/defaultavatar.png';
import { Rating } from '../../../../models/rating.model';

export interface IRatingCommentProps {
    ratingComments: Rating[];
}

export function RatingComment({ ratingComments }: IRatingCommentProps) {
    return (
        <>
            <div className="flex my-2 items-center gap-2">
                <span className="text-blue-500 text-2xl"><i className="ri-message-3-line"></i></span>
                <span className="mb-1 text-blue-500">Bình luận phía khách hàng </span>
            </div>

            <div className="flex flex-col gap-2">
                {ratingComments.length ? ratingComments.map((item, index) => (
                    <div className="flex w-full bg-slate-200 rounded-lg p-3 gap-2 items-center" key={index}>
                        <div className="shrink-0">
                            <img src={defaultAvartar} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                            <p className="text-md font-bold text-red-700">{item.fullName}</p>
                            <p className='text-sm text-gray-500 font-bold'>{new Date(item?.createdAt as string).toLocaleString('vi-VN')}</p>
                            </div>
                            <p>{item.ratingContent}</p>
                        </div>
                    </div>
                )) : (<><span>Chưa có bình luận nào.</span></>)}
            </div>
        </>
    );
}
