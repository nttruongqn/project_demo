import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeFeature } from '../features/user/home';
import { CheckoutFeature } from '../features/user/checkout';
import { ProductDetailFeature } from '../features/user/detail';
import { ProductListFeature } from '../features/user/productList';
import { NewsFeature } from '../features/user/news';
import { UserSettingFeature } from '../features/user/userSetting';

export interface IAppProps {
}

export function UserMain(props: IAppProps) {
    return (
        <>
            <main className="bg-slate-100 min-h-[600px] md:min-h-[670px] xl:min-h-[980px] border">
                <div className="container">
                    <Routes>
                        <Route path="" element={<HomeFeature />} />
                        <Route path="/*" element={<ProductListFeature />} />
                        <Route path="dien-thoai/*" element={<ProductDetailFeature />} />
                        <Route path="may-tinh/*" element={<ProductDetailFeature />} />
                        <Route path="thanh-toan/*" element={<CheckoutFeature />} />
                        <Route path="tin-tuc/*" element={<NewsFeature />} />
                        <Route path="tai-khoan/*" element={<UserSettingFeature />} />
                    </Routes>
                </div>
            </main>
        </>
    );
}


