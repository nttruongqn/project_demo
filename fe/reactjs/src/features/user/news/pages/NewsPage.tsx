import * as React from 'react';
import { useButtonCategory } from '../../../../store/hooks';
import { Helmet } from '../../../../components/Helmet/Helmet';
import { Category } from '../../home/components/Category';
import { CheckboxElements } from '../../../../models/checkbox-elements.model';

export interface INewsPageProps {
}

export function NewsPage(props: INewsPageProps) {
    const { isShowCategory, checkboxElements, phoneListFilterPrice } = useButtonCategory();

    return (
        <Helmet title='Tin tức'>
            {checkboxElements && isShowCategory && <Category data={checkboxElements as CheckboxElements} phoneListFilterPrice={phoneListFilterPrice} />}
            <div className='p-2'>
                <span>Tính năng đang được phát triển</span>
            </div>
        </Helmet>

    );
}
