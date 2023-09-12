import * as React from 'react';
import { CheckboxElements } from '../../../../models/checkbox-elements.model';
import { ListParams } from '../../../../models/common';

export interface IFilterProps {
    checkboxElements: CheckboxElements;
    onCheckbox: (listParams: ListParams) => void;
    filter: ListParams;
}

export interface ListChecked {
    id: string;
    name: string;
}

export function Filter({ checkboxElements, onCheckbox, filter }: IFilterProps) {
    const { batteryCapacitys, brands, rams, roms } = checkboxElements;
    const [brandChecked, setBrandChecked] = React.useState<any>([]);
    const [romChecked, setRomChecked] = React.useState<any>([]);
    const [batteryCapacityChecked, setBatteryCapacityChecked] = React.useState<any>([]);
    const [ramChecked, setRamChecked] = React.useState<any>([]);
    const [priceChecked, setPriceChecked] = React.useState<any>([]);
    const [listChecked, setListChecked] = React.useState<any>([]);
    const [newFilter, setNewFilter] = React.useState<any>({});
    const valueRef = React.useRef();

    const checkboxPrices = [
        {
            label: " Dưới 2 triệu",
            value: "lessthan2m"
        },
        {
            label: "Từ 2 đến 4 triệu",
            value: "between2mand4m"
        },
        {
            label: "Từ 4 đến 7 triệu",
            value: "between4mand7m"
        },
        {
            label: "Từ 7 đến 13 triệu",
            value: "between7mand13m"
        },
        {
            label: "Trên 13 triệu",
            value: "greaterthan13m"
        },
    ]

    const checkboxBatteryCapacitys = [
        {
            label: " Dưới 3000 mAh",
            value: "lessthan3000"
        },
        {
            label: "Pin từ 3000 - 4000 mAh",
            value: "between3000and4000"
        },
        {
            label: "Pin từ 4000 - 5000 mAh",
            value: "between4000and5000"
        },
        {
            label: "Pin trên 5000 mAh",
            value: "greaterthan5000"
        },
    ]

    const handleBrandCheck = (id: string, name: string) => {
        setBrandChecked((prev: any) => {
            const isChecked = brandChecked.includes(id)
            if (isChecked) {
                return brandChecked.filter((item: any) => item !== id)
            } else {
                return [...prev, id]
            }
        })

        setListChecked((prev: any) => {
            const existedData = listChecked.find((item: any) => item.id === id);
            const isChecked = listChecked.includes(existedData);
            if (isChecked) { return listChecked.filter((item: any) => item.id !== id) }
            else {
                return [...prev, { id, name, type: "brand" }]
            }
        });

        valueRef.current = listChecked;
    }


    const handlePriceCheck = (value: string, label: string) => {
        setPriceChecked((prev: any) => {
            const isChecked = priceChecked.includes(value)
            if (isChecked) {
                return priceChecked.filter((item: any) => item !== value)
            } else {
                return [...prev, value]
            }
        })

        setListChecked((prev: any) => {
            const existedData = listChecked.find((item: any) => item.id === value);
            const isChecked = listChecked.includes(existedData);
            if (isChecked) { return listChecked.filter((item: any) => item.id !== value) }
            else {
                return [...prev, { id: value, name: label, type: "price" }]
            }
        });
    }


    const handleRomCheck = (id: string, name: string) => {
        setRomChecked((prev: any) => {
            const isChecked = romChecked.includes(id)
            if (isChecked) {
                return romChecked.filter((item: any) => item !== id)
            } else {
                return [...prev, id]
            }
        })

        setListChecked((prev: any) => {
            const existedData = listChecked.find((item: any) => item.id === id);
            const isChecked = listChecked.includes(existedData);
            if (isChecked) { return listChecked.filter((item: any) => item.id !== id) }
            else {
                return [...prev, { id, name, type: "rom" }]
            }
        });
    }

    const handleRamCheck = (id: string, name: string) => {
        setRamChecked((prev: any) => {
            const isChecked = ramChecked.includes(id)
            if (isChecked) {
                return ramChecked.filter((item: any) => item !== id)
            } else {
                return [...prev, id]
            }
        })

        setListChecked((prev: any) => {
            const existedData = listChecked.find((item: any) => item.id === id);
            const isChecked = listChecked.includes(existedData);
            if (isChecked) { return listChecked.filter((item: any) => item.id !== id) }
            else {
                return [...prev, { id, name, type: "ram" }]
            }
        });
    }

    const handleBatteryCapacityCheck = (value: string, label: string) => {
        setBatteryCapacityChecked((prev: any) => {
            const isChecked = batteryCapacityChecked.includes(value);
            if (isChecked) {
                return batteryCapacityChecked.filter((item: any) => item !== value)
            } else {
                return [...prev, value]
            }
        })

        setListChecked((prev: any) => {
            const existedData = listChecked.find((item: any) => item.id === value);
            const isChecked = listChecked.includes(existedData);
            if (isChecked) { return listChecked.filter((item: any) => item.id !== value) }
            else {
                return [...prev, { id: value, name: label, type: "batteryCapacity" }]
            }
        });
    }

    const handleCloseTagCheckbox = async (id: string, name: string, type: string) => {
        switch (type) {
            case "brand":
                await handleBrandCheck(id, name)
                break;
            case "price":
                await handlePriceCheck(id, name)
                break;
            case "batteryCapacity":
                await handleBatteryCapacityCheck(id, name)
                break;
            case "ram":
                await handleRamCheck(id, name)
                break;
            case 'rom':
                await handleRomCheck(id, name)
                break;
            default:
                return 0;
        }
    }

    const handleFilter = () => {
      const newFilter: ListParams = {
            ...filter,
            page: 1,
            limit: 5,
            brandId: undefined,
            brandListIds: brandChecked,
            priceListValues: priceChecked,
            batteryCapacityListValues: batteryCapacityChecked,
            ramListIds: ramChecked,
            romListIds: romChecked,
            checkFilter: true
        }        
        if(!onCheckbox) return;
        onCheckbox(newFilter)
    }

    const handleReset = () => {
        setListChecked([]);
        setBrandChecked([]);
        setBatteryCapacityChecked([]);
        setPriceChecked([]);
        setRamChecked([]);
        setRomChecked([]);

        const newFilter1: ListParams = {
                page: 1,
                limit: 5,
                isSale: undefined,
                sort: undefined,
                order: undefined,
                checkFilter: true
            }
        onCheckbox(newFilter1);        
    }

    return (
        <div className='bg-white p-2 my-2 py-4 max-md:mx-2'>
            <div className="grid grid-cols-5 gap-2 max-md:grid-cols-2">
                <div className="col-span-1">
                    <div className="flex flex-col">
                        <div className="h1 text-sm font-bold">Hãng sản xuất</div>
                        <div className="py-1">
                            {brands.map(brand => (
                                <div key={brand.id}>
                                    <div className="flex items-center">
                                        <input className="accent-red-700" type="checkbox" checked={brandChecked.includes(brand.id)} onChange={() => handleBrandCheck(brand.id, brand.brandName)} />
                                        <span className='ml-2 text-sm'>{brand.brandName}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="h1 text-sm font-bold">Mức giá</div>
                    <div className="py-1">
                        {checkboxPrices.map(price => (
                            <div key={price.value}>
                                <div className="flex items-center">
                                    <input className="accent-red-700" type="checkbox" checked={priceChecked.find((item: any) => item === price.value)} onChange={() => handlePriceCheck(price.value, price.label)} />
                                    <span className='ml-2 text-sm'>{price.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1"><div className="h1 text-sm font-bold">Dung lượng pin</div>
                    <div className="py-1">
                        {checkboxBatteryCapacitys.map(batteryCapacity => (
                            <div key={batteryCapacity.value}>
                                <div className="flex items-center">
                                    <input className="accent-red-700" type="checkbox" checked={batteryCapacityChecked.find((item: any) => item === batteryCapacity.value)} onChange={() => handleBatteryCapacityCheck(batteryCapacity.value, batteryCapacity.label)} />
                                    <span className='ml-2 text-sm'>{batteryCapacity.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="col-span-1"><div className="h1 text-sm font-bold">Ram</div>
                    <div className="py-1">
                        {rams.sort((a, b) => parseInt(a.name) - parseInt(b.name)).map(ram => (
                            <div key={ram.id}>
                                <div className="flex items-center">
                                    <input className="accent-red-700" type="checkbox" checked={ramChecked.includes(ram.id)} onChange={() => handleRamCheck(ram.id, ram.name)} />
                                    <span className='ml-2 text-sm'>{ram.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="col-span-1"><div className="h1 text-sm font-bold">Rom</div>
                    <div className="py-1">
                        {roms.sort((a, b) => parseInt(a.name) - parseInt(b.name)).map(rom => (
                            <div key={rom.id}>
                                <div className="flex items-center">
                                    <input className="accent-red-700" type="checkbox" checked={romChecked.includes(rom.id)} onChange={() => handleRomCheck(rom.id, rom.name)} />
                                    <span className='ml-2 text-sm'>{rom.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="col-span-1"><div className="h1 text-sm font-bold">Tính năng đặc biệt</div>
                </div>               */}
            </div>
            {listChecked.length ? (<div className="my-1">
                <div className="flex flex-wrap gap-1 items-center">
                    <span className='text-sm'>Lọc theo: </span>
                    {listChecked.map((item: any, index: number) => (
                        <div className="border rounded-sm border-gray-400 px-1 flex gap-1 items-center flex-wrap" key={index}>
                            <span className='text-sm text-gray-500 font-thin'>{item.name}</span>
                            <span className='text-sm text-gray-500 cursor-pointer' onClick={() => handleCloseTagCheckbox(item.id, item.name, item.type)}> × </span>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2 my-2">
               <button className='px-2 bg-red-700 border rounded-sm max-md:py-1' onClick={handleFilter}><span className='text-sm text-white font-bold'>Lọc kết quả</span></button>
               <button className='px-2  border rounded-sm max-md:py-1' onClick={handleReset}><span className='text-sm text-red-700 font-bold' onClick={() => handleReset()}>Xóa tất cả</span></button>
                </div>
            </div>
            ) : <></>
            }
        </div>
    );
}
