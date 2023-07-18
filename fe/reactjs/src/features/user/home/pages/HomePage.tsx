import * as React from 'react';

import { productApi } from '../../../../api/productApi';
import { Product } from '../../../../models';
import { Banner } from '../components/Banner';
import { Category } from '../components/Category';
import { ListPhone } from '../components/ListPhone';
import { ListLaptop } from '../components/ListLaptop';
import { Helmet } from '../../../../components/Helmet/Helmet';

export interface IHomePageProps {
}

export function HomePage(props: IHomePageProps) {
    const [phoneList, setPhoneList] = React.useState<Product[]>([]);
    const [laptopList, setLaptopList] = React.useState<Product[]>([]);


    React.useEffect(() => {
        (async () => {
            const fetchPhoneListData = await productApi.getAllPaginate({ categoryType: 'Điện thoại', limit: 10 })
            setPhoneList(fetchPhoneListData.items);
            const fetchLaptopListData = await productApi.getAllPaginate({ categoryType: 'Máy tính', limit: 10 })
            setLaptopList(fetchLaptopListData.items);
        })()
    }, [])

    return (
        <>
            <Helmet title='Trang chủ'>
                <Category />
                <Banner />
                <ListPhone phoneList={phoneList} />
                {/* <ListLaptop laptopList={laptopList} /> */}
            </Helmet>
        </>
    );
}
