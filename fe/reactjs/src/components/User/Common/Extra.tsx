import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useButtonCategory } from '../../../store/hooks';

export function Extra() {
    const { showCategory, isShowCategory, showNews, isShowNews, showHome, isShowHome, showUserSetting, isShowUserSetting } = useButtonCategory();
    const { user, handleShowLogin } = useAuth();
    const navigate = useNavigate();

    const handleShowNews = () => {
        navigate('tin-tuc');
        showNews();
    }

    const handleShowUserSetting = () => {
        if(user){
            navigate('tai-khoan');
            showUserSetting();
        } else {
            handleShowLogin()
        }
    }
  
  
    return (
        // <!-- extra -->
        <>
            <div className="bottom-tab w-full h-[52px] bg-white bottom-0 md:hidden z-50 grid grid-cols-4 gap-1">
                <div className={`col-span-1  flex flex-col items-center relative ${isShowHome ? 'text-red-700' : 'text-gray-700'}`} onClick={showHome}>
                    <span className="text-2xl"><i className="ri-home-8-line"></i></span>
                    <span className="text-[14px] absolute bottom-1">Trang chủ</span>
                </div>
                <div className={`col-span-1  flex flex-col items-center relative ${isShowCategory ? 'text-red-700' : 'text-gray-700'}`} onClick={showCategory}>
                    <span className="text-2xl"><i className="ri-grid-fill"></i></span>
                    <span className="text-[14px] absolute bottom-1">Danh mục</span>
                </div>
                <div className={`col-span-1  flex flex-col items-center relative ${isShowNews ? 'text-red-700' : 'text-gray-700'}`} onClick={handleShowNews}>
                    <span className="text-2xl"><i className="ri-newspaper-line"></i></span>
                    <span className="text-[14px] absolute bottom-1">Tin tức</span>
                </div>
                <div className={`col-span-1  flex flex-col items-center relative ${isShowUserSetting ? 'text-red-700' : 'text-gray-700'}`} onClick={handleShowUserSetting}>
                    <span className="text-2xl"><i className="ri-user-6-fill"></i></span>
                    <span className="text-[14px] absolute bottom-1">Tài khoản</span>
                </div>
            </div>
        </>
    );
}
