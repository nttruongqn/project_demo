import * as React from 'react';
import { TotalNumberSectionsModel } from '../../../../models/total-sections.model';
import { TotalBox } from './TotalBox';

export interface ITotalSectionProps {
    totalNumberSections: TotalNumberSectionsModel
}

export function TotalSection({ totalNumberSections }: ITotalSectionProps) {
    return (
        <>
            <div className="grid grid-cols-4 gap-2">
                <TotalBox total={totalNumberSections?.totalNumberCategories as number} title='Tổng số danh mục' />
                <TotalBox total={totalNumberSections?.totalNumberProducts as number} title='Tổng số sản phẩm' />
                <TotalBox total={totalNumberSections?.totalNumberTransactions as number} title='Tổng số đơn hàng' />
                <TotalBox total={totalNumberSections?.totalNumberUsers as number} title='Tổng số tài khoản' />
            </div>

        </>
    );
}
