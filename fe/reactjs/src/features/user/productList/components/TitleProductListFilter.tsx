import * as React from 'react';
import { ListParams } from '../../../../models/common';

export interface ITitleProductListFilterProps {
    titleName: string;
    filter: ListParams;
    onChange: (listParams: ListParams) => void;
}

export function TitleProductListFilter({ titleName, filter, onChange }: ITitleProductListFilterProps) {
    const [isBtnDefault, setIsBtnDefault] = React.useState<boolean>(true);
    const [isBtnSale, setIsBtnSale] = React.useState<boolean>(false);
    const [isBtnAsc, setIsBtnAsc] = React.useState<boolean>(false);
    const [isBtnDesc, setIsBtnDesc] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsBtnDefault(true)
    },[])


    const handleFilterProductDefault = () => {
        if (!onChange) return;
        const newFilter: ListParams = {
            page: 1,
            limit: 5,
            checkFilter: true
        }
        console.log('v', newFilter);
        onChange?.(newFilter)
        setIsBtnDefault(true)
        setIsBtnSale(false)
        setIsBtnAsc(false)
        setIsBtnDesc(false)
    }

    const handleFilterProductSale = () => {
        if (!onChange) return;
        const newFilter: ListParams = { page: 1,
            limit: 5, isSale: true, checkFilter: true
        }
        onChange?.(newFilter)
        setIsBtnSale(true)
        setIsBtnDefault(false)
        setIsBtnAsc(false)
        setIsBtnDesc(false)
    }

    const handleFilterProductAsc = () => {
        if (!onChange) return;
        const newFilter: ListParams = { isSale: undefined, sort: 'price', order: 'ASC', page: 1, limit: 5, checkFilter: true }
        console.log('v', newFilter);

        onChange?.(newFilter)
        setIsBtnAsc(true)
        setIsBtnSale(false)
        setIsBtnDefault(false)
        setIsBtnDesc(false)
    }

    const handleFilterProductDesc = () => {
        if (!onChange) return;
        const newFilter: ListParams = { isSale: undefined, sort: 'price', order: 'DESC', page: 1, limit: 5,  checkFilter: true }
        onChange?.(newFilter)
        setIsBtnDesc(true)
        setIsBtnAsc(false)
        setIsBtnSale(false)
        setIsBtnDefault(false)
    }

    const bgDefault = "min-w-[100px] py-2 flex items-center justify-center rounded border bg-white"
    const textDefault = "text-gray-500 text-sm"
    const bgActive = "min-w-[100px] py-2 flex items-center justify-center rounded border bg-red-700"
    const textActive = "text-white text-sm"

    return (
        <div>
            <div className="flex max-md:flex-col md:flex-row md:items-center md:justify-between ">
                <h2 className="text-2xl text-red-700 font-bold max-md:p-2 max-md:py-1 md:py-4"> {titleName} </h2>
                <div className="flex items-center md:justify-end max-md:px-2 max-md:py-1 md:py-4">
                    <span className="max-md:text w-1/4">Sắp xếp:</span>
                    <div
                        className="md:ml-2 flex justify-start items-center gap-2 max-md:overflow-x-auto max-md:mobile-scroll">
                        <button
                            className={isBtnDefault ? bgActive : bgDefault}><span
                                className={ isBtnDefault? textActive : textDefault } onClick={handleFilterProductDefault}>Mặc định</span></button>
                        <button
                            className={isBtnSale ? bgActive : bgDefault}><span
                                className={ isBtnSale ? textActive : textDefault } onClick={handleFilterProductSale}>Giảm giá</span></button>
                        <button
                            className={isBtnAsc ? bgActive : bgDefault}><span
                                className={ isBtnAsc ? textActive : textDefault } onClick={handleFilterProductAsc}>Giá thấp - cao</span></button>
                        <button
                            className={isBtnDesc ? bgActive : bgDefault}><span
                                className={ isBtnDesc ? textActive : textDefault } onClick={handleFilterProductDesc}>Giá cao - thấp</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
