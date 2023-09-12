import * as React from 'react';
import { useAuth, useButtonCategory } from '../../../../store/hooks';
import { Helmet } from '../../../../components/Helmet/Helmet';
import { Category } from '../../home/components/Category';
import { CheckboxElements } from '../../../../models/checkbox-elements.model';
import { Avatar } from '@mui/material';

export interface IUserSettingPageProps {
}

export function UserSettingPage(props: IUserSettingPageProps) {
    const { user, handleShowChangePassword, logout } = useAuth();
    const { isShowCategory, checkboxElements, phoneListFilterPrice } = useButtonCategory();

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    }


    return (
        <Helmet title='Tài khoản'>
            {checkboxElements && isShowCategory && <Category data={checkboxElements as CheckboxElements} phoneListFilterPrice={phoneListFilterPrice} />}
            <div className='border h-screen bg-white max-md:hidden p-2'>
                <span>Tính năng đang phát triển trên di động</span>
            </div>
            <div className="md:hidden bg-white h-screen">
                <div className="flex p-4 border-b-2 items-center">
                    <div className="rounded-full">
                        <Avatar />
                    </div>
                    <div className="px-4">
                        <p className='text-md font-bold'> Chào {user?.username} </p>
                        <p className='text-sm'> Trạng thái: {user?.status === "active" && "Đã kích hoạt"}
                            {user?.status === "inactive" && "Chưa kích hoạt"} </p>
                        <p></p>
                    </div>
                </div>
                <div className="flex px-4 py-2 border-b-2 items-center">
                    <span className='text-xl'><i className="ri-pencil-fill"></i></span>
                    <div className="px-4">
                        <p className='text-md' onClick={handleShowChangePassword}> Đổi mật khẩu </p>
                    </div>
                </div>
                <div className="flex px-4 py-2 border-b-2 items-center">
                    <span className='text-xl'><i className="ri-logout-box-r-line"></i></span>
                    <div className="px-4">
                        <p className='text-md' onClick={handleLogout}> Đăng xuất </p>
                    </div>
                </div>

            </div>
        </Helmet>

    );
}
