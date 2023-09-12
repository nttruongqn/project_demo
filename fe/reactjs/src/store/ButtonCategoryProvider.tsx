import { createContext, useEffect, useState } from "react";
import { Product } from "../models";
import { CheckboxElements } from "../models/checkbox-elements.model";
import { productApi } from "../api/productApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { productListActions } from "../features/user/productList/productList.slice";

interface Props {
    children: React.ReactNode;
}

interface ButtonCategoryContextValue {
    showCategory: () => void;
    isShowCategory: boolean;
    showNews: () => void;
    isShowNews: boolean;
    showHome: () => void;
    isShowHome: boolean;
    showUserSetting: () => void;
    isShowUserSetting: boolean;
    checkboxElements: CheckboxElements | undefined;
    phoneListFilterPrice: Product[];
    resetButton: () => void;
    handleSelectPrice: (value: string) => void;
    handleSelectBrand: (value: string) => void;
    categoryPriceValue: string;
    categoryBrandValue: string;

}
export const ButtonCategoryContext = createContext<ButtonCategoryContextValue | null>(null);

function ButtonCategoryProvider({ children }: Props) {
    const [isShowCategory, setIsShowCategory] = useState<boolean>(false);
    const [isShowNews, setIsShowNews] = useState<boolean>(false);
    const [isShowHome, setIsShowHome] = useState<boolean>(true);
    const [isShowUserSetting, setIsShowUserSetting] = useState<boolean>(false);
    const [phoneList, setPhoneList] = useState<Product[]>([]);
    const [phoneListFilterPrice, setPhoneListFilterPrice] = useState<Product[]>([]);
    const [checkboxElements, setCheckboxElements] = useState<CheckboxElements>();
    const [categoryBrandValue, setCategoryBrandValue] = useState('');
    const [categoryPriceValue, setCategoryPriceValue] = useState('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            const fetchPhoneListData = await productApi.getAllPaginate({ categoryType: 'Điện thoại', limit: 10 })
            setPhoneList(fetchPhoneListData.items);
            const phoneListSortByPrice = fetchPhoneListData.items.sort((a, b) => b.price - a.price);
            setPhoneListFilterPrice(phoneListSortByPrice.slice(0, 5));
            const data = await productApi.getElementsCheckBoxProduct();
            setCheckboxElements(data)
        })()
    }, [])

    const showCategory = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsShowCategory(!isShowCategory);
        setIsShowHome(false)
        setIsShowNews(false);
        setIsShowUserSetting(false);
    }

    const showNews = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsShowNews(true);
        setIsShowCategory(false);
        setIsShowHome(false)
        setIsShowUserSetting(false);
    }

    const showHome = () => {
        window.location.href = '/';
        setIsShowHome(true);
        setIsShowCategory(false);
        setIsShowNews(false);
        setIsShowUserSetting(false);
    }

    const showUserSetting = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsShowUserSetting(!isShowUserSetting);
        setIsShowCategory(false);
        setIsShowHome(false);
        setIsShowNews(false);
    }

    const resetButton = () => {
        setIsShowHome(false);
        setIsShowCategory(false);
        setIsShowNews(false);
        setIsShowUserSetting(false);
    }

    const handleSelectPrice = (value: string) => {
       setCategoryPriceValue(value);
    }

    const handleSelectBrand = (value: string) => {
        setCategoryBrandValue(value);
    }


    const buttonCategoryContextValue: ButtonCategoryContextValue = {
        showCategory,
        isShowCategory,
        showNews,
        isShowNews,
        showHome,
        isShowHome,
        showUserSetting,
        isShowUserSetting,
        checkboxElements,
        phoneListFilterPrice,
        handleSelectPrice,
        handleSelectBrand,
        categoryBrandValue,
        categoryPriceValue,
        resetButton
    }

    return <ButtonCategoryContext.Provider value={buttonCategoryContextValue}> {children} </ButtonCategoryContext.Provider>
}
export default ButtonCategoryProvider;

