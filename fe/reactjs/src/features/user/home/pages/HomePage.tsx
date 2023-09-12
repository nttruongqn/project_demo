import * as React from 'react';

import { productApi } from '../../../../api/productApi';
import { Product } from '../../../../models';
import { Banner } from '../components/Banner';
import { Category } from '../components/Category';
import { ListPhone } from '../components/ListPhone';
import { ListLaptop } from '../components/ListLaptop';
import { Helmet } from '../../../../components/Helmet/Helmet';
import { CheckboxElements } from '../../../../models/checkbox-elements.model';
import { useButtonCategory } from '../../../../store/hooks';

export interface IHomePageProps {
}

export function HomePage(props: IHomePageProps) {
    const { isShowCategory } = useButtonCategory();
    const [phoneList, setPhoneList] = React.useState<Product[]>([]);
    const [phoneListFilterPrice, setPhoneListFilterPrice] = React.useState<Product[]>([]);

    const [laptopList, setLaptopList] = React.useState<Product[]>([]);
    const [checkboxElements, setCheckboxElements] = React.useState<CheckboxElements>();


    React.useEffect(() => {
        (async () => {
            const fetchPhoneListData = await productApi.getAllPaginate({ categoryType: 'Điện thoại', limit: 10 })
            setPhoneList(fetchPhoneListData.items);

            const phoneListSortByPrice = fetchPhoneListData.items.sort((a, b) => b.price - a.price);
            setPhoneListFilterPrice(phoneListSortByPrice.slice(0, 5));

            const fetchLaptopListData = await productApi.getAllPaginate({ categoryType: 'Máy tính', limit: 10 })
            setLaptopList(fetchLaptopListData.items);
            const data = await productApi.getElementsCheckBoxProduct();
            setCheckboxElements(data)
        })()
    }, [])

    return (
        <>
            <Helmet title='Trang chủ'>
                {checkboxElements && isShowCategory &&<Category data={checkboxElements as CheckboxElements} phoneListFilterPrice={phoneListFilterPrice} />}
                {checkboxElements  && <Banner data={checkboxElements as CheckboxElements} phoneListFilterPrice={phoneListFilterPrice} />}
                {phoneList.length > 0 && (<ListPhone phoneList={phoneList}/>)}
                {/* <ListLaptop laptopList={laptopList} /> */}
            </Helmet>
        </>
    );
}
