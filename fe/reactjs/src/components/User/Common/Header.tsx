import { Modal, Box } from '@mui/material';
import * as React from 'react';
import { useAuth, useShoppingCart } from '../../../store/hooks';
import authApi from '../../../api/authApi';
import { LoginModel, RegisterModel } from '../../../models';
import { RegisterForm } from '../../../features/user/home/components/RegisterForm';
import { UserAuthForm } from '../../../features/user/home/components/UserAuthForm';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    outline: 'none',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function Header(props: IHeaderProps) {
    const [open, setOpen] = React.useState(false);
    const [isShowLogin, setIsShowLogin] = React.useState(false);
    const [isShowRegister, setIsShowRegister] = React.useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
    const [isRegisterFailed, setIsRegisterFailed] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { cartQuantity } = useShoppingCart();


    // React.useEffect(() => {
    //     setIsShowLogin(false)
    //     setIsShowRegister(false)
    //     setIsRegisterSuccess(false)
    //     setIsRegisterFailed(false)
    // }, [])

    const { user, login, logout } = useAuth();

    const initialValues: LoginModel = {
        email: "",
        password: "",
        repassword: "",
        username: ""
        // ...login,
    } as LoginModel;

    const initialRegisterValues: RegisterModel = {
        email: "",
        password: "",
        repassword: "",
        username: ""
        // ...login,
    } as RegisterModel;

    const handleLoginUser = async ({ email, password }: LoginModel) => {
        await login(email, password)
    }

    const handleRegisterUser = async (data: RegisterModel) => {
        try {
            await authApi.userRegister(data)
            setIsRegisterSuccess(true);
            setIsRegisterFailed(false);

        } catch (error) {
            setIsRegisterFailed(true);
            setIsRegisterSuccess(false);
            console.log('Register error')
        }
    }

    const handleShowLogin = () => {
        setIsShowLogin(true)
        setIsShowRegister(false)
        handleOpen()
    }

    const handleShowRegister = () => {
        setIsShowLogin(false)
        setIsShowRegister(true)
        handleOpen()
    }

    return (
        <>
            <header className="max-md:h-[65px] bg-red-700 max-md:px-2">
                <div className="container ">
                    <div className="max-md:grid max-md:grid-cols-8 max-md:gap-0.5 py-3 md:flex md:gap-x-8 md:items-center cursor-pointer">
                        <div className="max-md:col-span-1 h-full flex items-center justify-center p-1 md:w-1/6">
                            <h1 className="text-white text-2lg font-semibold"> <Link to='/'>Logo</Link> </h1>
                        </div>
                        <div className="max-md:col-span-5 h-full md:w-2/6 ">
                            <div className="max-md:w-full max-md:h-full flex items-center bg-white p-1 rounded-md">
                                <input type="text" className="h-full w-4/5 px-2 outline-none flex items-center" />
                                <span
                                    className="h-full w-1/5 text-red-700 flex items-center rounded-md justify-center font-bold text-2xl"><i
                                        className="ri-search-line"></i></span>
                            </div>
                        </div>
                        <div className="w-3/6 flex justify-end max-md:hidden gap-4">
                            <div className="w-1/4 flex items-center justify-end gap-1">
                                <p className="text-white text-xl"><i className="ri-shopping-cart-line"></i></p>
                                <p className="text-white"> <Link to='thanh-toan'>Giỏ hàng {cartQuantity > 0 && (<><span>({cartQuantity})</span></>)}</Link></p>
                            </div>
                            <div className="w-1.5/4 flex flex-row justify-end items-center gap-1">
                                <p className="text-white text-xl"><i className="ri-user-line"></i></p>
                                {!user ? (<>
                                    <p className="text-white cursor-pointer" onClick={handleShowLogin}>Đăng nhập</p>
                                    <p className="text-white">|</p>
                                    <p className="text-white cursor-pointer" onClick={handleShowRegister}>Đăng kí </p>
                                </>) : (<>  <p className="text-white cursor-pointer" onClick={handleShowLogin}>Chào {user.username}</p>
                                    <p className="text-white">|</p>
                                    <p className="text-white cursor-pointer" onClick={logout}>Đăng xuất </p></>)}
                            </div>
                        </div>
                        <div className="max-md:col-span-1 h-full flex items-center justify-center py-1 md:hidden relative">
                            <span className="text-white text-2xl"> <Link to='thanh-toan'><i className="ri-shopping-cart-line"></i></Link></span>
                            <div className="absolute w-5 h-5 rounded-xl bg-white top-0 right-1 flex justify-center items-center"><span className='text-sm text-red-700 font-bold'>{cartQuantity}</span></div>
                        </div>

                        {user == null ? (<div className="max-md:col-span-1 h-full flex items-center justify-center py-1 md:hidden">
                            <span className="text-white text-2xl" onClick={handleShowLogin}><i className="ri-user-line"></i>
                            </span>
                        </div>) : <div className="max-md:col-span-1 h-full flex items-center justify-center py-1 md:hidden">
                            <span className="text-white text-2xl" onClick={logout}><i className="ri-logout-box-r-line"></i>
                            </span>
                        </div>}


                    </div>
                </div>
            </header>

            {!user && (<Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='md:w-[400px] max-md:w-5/6'>
                    <div className="flex flex-col gap-3">
                        {
                            isShowLogin && (
                                <UserAuthForm
                                    initialValues={initialValues}
                                    onLoginSubmit={handleLoginUser}
                                    handleShowRegister={handleShowRegister}
                                />
                            )
                        }

                        {
                            isShowRegister && (
                                <RegisterForm
                                    initialValues={initialRegisterValues}
                                    onRegisterSubmit={handleRegisterUser}
                                    handleShowLogin={handleShowLogin}
                                    isRegisterFailed={isRegisterFailed}
                                    isRegisterSuccess={isRegisterSuccess}
                                />)
                        }
                    </div>
                </Box>
            </Modal>)
            }
        </>

    );
}
