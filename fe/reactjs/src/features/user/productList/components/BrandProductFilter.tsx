import * as React from 'react';
import { brandApi } from '../../../../api/brandApi';
import { Brand } from '../../../../models/brand.model';
import { ListParams } from '../../../../models/common';

export interface IBrandProductFilterProps {
    filter: ListParams;
    onChange?: (newFilter: ListParams) => void;
    handleShowFilter: () => void;
}

export function BrandProductFilter({ filter, onChange, handleShowFilter }: IBrandProductFilterProps) {
    const [brands, setBrands] = React.useState<Brand[]>()

    React.useEffect(() => {
        (async () => {
            const dataBrands = await brandApi.getAll();
            setBrands(dataBrands)
        })()
    },[])

    const handleFilter = (brandId: string) => {
        if(!onChange) return;
        const newFilter = {
            ...filter,
            page: 1,
            limit: 5,
            brandId,
            brandListIds: [],
            priceListValues: [],
            checkFilter: true
        }
        handleShowFilter()
        onChange(newFilter)
    }

    return (
        <>
            <div className="flex gap-2 items-center justify-start max-md:px-2 overflow-x-auto mobile-scroll">
                {brands?.map((brand, index) => (
                    <div className="cursor-pointer min-w-[120px] flex items-center justify-center" key={index} onClick={() => handleFilter(brand.id)}>
                        <img src={brand.brandImageUrl} alt="" className="w-[120px] h-[40px]  border rounded" />
                    </div>
                ))}
            </div>
        </>
    );
}
