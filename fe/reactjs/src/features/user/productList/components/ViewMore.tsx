import * as React from 'react';
import { ListParams } from '../../../../models/common';

export interface IViewMoreProps {
    filter: ListParams;
    currentPage: number;
    remountNumber: number;
    onPageChange: (listParams: ListParams) => void;
}

export function ViewMore({ filter, currentPage, remountNumber, onPageChange }: IViewMoreProps) {
    const handlePageChange = () => {
        if(!onPageChange) return;
        const newFilter = {
            ...filter,
            page: currentPage + 1,
        }
        onPageChange?.(newFilter)
    }

    return (
        <div className="flex items-center justify-center max-md:my-2 my-4" onClick={handlePageChange}>
            <button className="bg-white rounded-md p-2 justify-center border-black border shadow-xl">
                <span className="text-sm">Xem thêm { remountNumber } sản phẩm</span>
            </button>
        </div>
    );
}
