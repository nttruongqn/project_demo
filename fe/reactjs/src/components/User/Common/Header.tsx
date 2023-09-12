import { Modal, Box } from '@mui/material';
import * as React from 'react';
import { useAuth, useShoppingCart } from '../../../store/hooks';
import authApi from '../../../api/authApi';
import { LoginModel, Product, RegisterModel } from '../../../models';
import { RegisterForm } from '../../../features/user/home/components/RegisterForm';
import { UserAuthForm } from '../../../features/user/home/components/UserAuthForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { ForgotPassword } from '../../../features/user/home/components/ForgotPassword';
import { EmailForgotPasswordModel, ResetPasswordModel } from '../../../models/forgot-password.model';
import { toast } from 'react-toastify';
import { ResetPassword } from '../../../features/user/home/components/ResetPassword';
import { useClickAway } from '@uidotdev/usehooks';
import { ChangePasswordModel } from '../../../models/change-password.model';
import { ChangePassword } from '../../../features/user/home/components/ChangePassword';
import { productApi } from '../../../api/productApi';
import { formatCurrency } from '../../../core/formatCurrency';

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
    const [isShowForgotPassword, setIsShowForgotPassword] = React.useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
    const [isRegisterFailed, setIsRegisterFailed] = React.useState(false);
    const [isShowResetPassword, setIsShowResetPassword] = React.useState(false);
    const [isShowChangePassword, setIsShowChangePassword] = React.useState(false);
    const [isShowSectionChangePassword, setIsShowSectionChangePassword] = React.useState(false);
    const [messageForgetPasswordSuccess, setMessageForgetPasswordSuccess] = React.useState('');
    const [showSearchResult, setShowSearchResult] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const DIENTHOAI = 'Điện thoại'



    const [passwordToken, setPasswordToken] = React.useState<string | null>();
    const [emailParam, setEmailParam] = React.useState<string | null>();
    const [productSearchList, setProductSearchList] = React.useState<Product[]>([]);

    React.useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const passwordTokenParam = queryParams.get('password_token');
        setPasswordToken(passwordTokenParam);

        const emailParam = queryParams.get('email');
        setEmailParam(emailParam);

        if (passwordToken && emailParam) {
            setIsShowResetPassword(true);
            handleOpen();
        }
    }, [passwordToken, emailParam, location.search])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { cartQuantity } = useShoppingCart();
    const { user, login, logout, isLoggedOut, handleResetLogin, isShowLoginProvider, isShowChangePasswordProvider, handleResetChangePassword } = useAuth();

    React.useLayoutEffect(() => {
        if (isLoggedOut) {
            handleClose()
        }
    }, [isLoggedOut])

    React.useEffect(() => {
        if (isShowLoginProvider) {
            setIsShowLogin(true)
            setIsShowRegister(false)
            setIsShowForgotPassword(false)
            setIsShowResetPassword(false)
            setIsShowChangePassword(false)
            handleResetLogin()
            handleOpen()
        }
    }, [isShowLoginProvider, handleResetLogin])

    React.useEffect(() => {
        if (isShowChangePasswordProvider) {
            setIsShowForgotPassword(false)
            setIsShowLogin(false)
            setIsShowRegister(false)
            setIsShowResetPassword(false)
            setIsShowChangePassword(true)
            handleResetChangePassword()
            handleOpen()
        }
    }, [isShowChangePasswordProvider, handleResetChangePassword])

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

    const initialForgotPassword: EmailForgotPasswordModel = {
        email: "",
    } as EmailForgotPasswordModel;

    const initialChangePassword: ChangePasswordModel = {
        email: "",
        currentPassword: '',
        newPassword: '',
        repassword: '',
    } as ChangePasswordModel;


    const ref: any = useClickAway(() => {
        setIsShowSectionChangePassword(false);
    })

    const refSearch: any = useClickAway(() => {
        setShowSearchResult(false);
    })

    const initialResetPassword: ResetPasswordModel = {
        newPassword: "",
        repassword: "",
    } as ResetPasswordModel;

    const handleLoginUser = async ({ email, password }: LoginModel) => {
        await login(email, password)
    }

    const handleRegisterUser = async (data: RegisterModel) => {
        try {
            await authApi.userRegister(data)
            setIsRegisterSuccess(true);
            setIsRegisterFailed(false);

        } catch (error: any) {
            setIsRegisterFailed(true);
            setIsRegisterSuccess(false);
            toast.error(error.response.data.message, {
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }
    }

    const handleForgotPassword = async (data: EmailForgotPasswordModel) => {
        try {
            await authApi.sendEmailForgotPassword(data.email);
            setMessageForgetPasswordSuccess('Yêu cầu đã được gửi đến email, vui lòng kiểm tra email.')
        } catch (error: any) {
            toast.error(error.response.data.message, {
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }


    const handleChangePassword = async (data: ChangePasswordModel) => {
        try {
            if (user) {
                data.email = user.email;
            }
            await authApi.resetPassword(data);
            toast.success("Thay đổi mật khẩu thành công", {
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                window.location.href = '/'
            }, 500)
        } catch (error: any) {
            toast.error(error.response.data.message, {
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }


    const handleResetPassword = async (data: ResetPasswordModel) => {
        try {
            if (passwordToken && emailParam) {
                data.passwordToken = passwordToken;
                data.email = emailParam;
            }
            await authApi.resetPassword(data);
            toast.success("Thay đổi mật khẩu thành công", {
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                window.location.href = '/'
            }, 500)
        } catch (error: any) {
            toast.error(error.response.data.message, {
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    const handleShowLogin = () => {
        setIsShowLogin(true)
        setIsShowRegister(false)
        setIsShowForgotPassword(false)
        setIsShowResetPassword(false)
        setIsShowChangePassword(false)
        handleOpen()
    }

    const handleShowRegister = () => {
        setIsShowLogin(false)
        setIsShowRegister(true)
        setIsShowForgotPassword(false)
        setIsShowResetPassword(false)
        setIsShowChangePassword(false)
        handleOpen()
    }

    const handleShowForgotPassword = () => {
        setIsShowForgotPassword(true)
        setIsShowLogin(false)
        setIsShowRegister(false)
        setIsShowResetPassword(false)
        setIsShowChangePassword(false)
        handleOpen()
    }

    const handleShowChangePassword = () => {
        setIsShowForgotPassword(false)
        setIsShowLogin(false)
        setIsShowRegister(false)
        setIsShowResetPassword(false)
        setIsShowChangePassword(true)
        handleOpen()
    }

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setInputValue(e.target.value)
            const newFilter = {
                searchKey: inputValue,
                page: 1,
                limit: 10,
                categoryType: DIENTHOAI
            };
            const fetchSearchProduct = await productApi.getAllPaginate(newFilter);
            setProductSearchList(fetchSearchProduct.items);
            setShowSearchResult(true);
        } else {
            setInputValue("")
            setProductSearchList([]);
        }
    }

    const handleSearchResult = (slug: string) => {
        window.location.href = `/dien-thoai/${slug}`;
        // setInputValue("")
        // setShowSearchResult(false);
    }

    return (
        <>
            <header className="max-md:h-[65px] md:h-[65px] bg-red-700 max-md:pr-2 max-md:pl-4">
                <div className="container ">
                    <div className="max-md:grid max-md:grid-cols-8 max-md:gap-0.5 py-3 md:flex md:gap-x-8 md:items-center md:cursor-pointer">
                        <div className="max-md:col-span-1 h-full flex items-center justify-center p-1 md:w-1/6">
                            <h1 className="text-white text-2lg font-semibold" onClick={() => { window.location.href = '/' }}><span className='font-mono text-2xl max-md:text-sm'>TeeSHOP</span> </h1>
                        </div>
                        <div className="max-md:col-span-5 md:w-2/6 relative">
                            <div className="max-md:mx-2 max-md:h-full flex items-center bg-white p-1 rounded-md justify-between">
                                <input value={inputValue} type="text" className="h-full w-4/5 px-2 outline-none flex items-center" onChange={handleSearchChange} />
                                <span
                                    className="h-full w-1/6 text-red-700 flex rounded-md items-center justify-center font-bold text-2xl"><i
                                        className="ri-search-line"></i>
                                </span>
                            </div>
                            {showSearchResult && productSearchList.length > 0 && <div className="absolute w-full left-0 top-[110%] right-0 bg-white z-20 rounded-md">
                                <div className="p-2 max-h-[240px] overflow-y-scroll">
                                    <p className='font-bold text-sm'>Sản phẩm liên quan</p>
                                    <div className="mt-2">
                                        {productSearchList.map((item, index) => (
                                            <div className="flex items-center gap-2 border-b last:border-b-0 py-2" ref={refSearch} key={index} onClick={() => handleSearchResult(item.slug)}>
                                                <img src={item.imageUrl} alt="" className='w-[60px] h-[60px]' />
                                                <div className="flex flex-col gap-1 justify-start">
                                                    <p className='text-sm'>{item.name}</p>
                                                    <div className="text-sm text-red-700 font-bold">{formatCurrency(item.price)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            }

                            {/* {showSearchResult && productSearchList.length === 0 && <div className="absolute w-full left-0 top-[110%] right-0 bg-white z-20 rounded-md">
                                <div className="p-2 min-h-[60px]">
                                    <p className='font-bold text-sm'>Không tìm thấy kết quả</p>
                                </div>
                            </div>
                            } */}

                        </div>
                        <div className="w-3/6 flex justify-end max-md:hidden gap-4">
                            <div className="w-1/4 flex items-center justify-end gap-1">
                                <p className="text-white text-xl"><i className="ri-shopping-cart-line"></i></p>
                                <p className="text-white" onClick={() => { window.location.href = 'thanh-toan' }}> Giỏ hàng {cartQuantity > 0 && (<><span>({cartQuantity})</span></>)}</p>
                            </div>
                            <div className="relative w-1.5/4 flex flex-row justify-end items-center gap-1 ">
                                <p className="text-white text-xl"><i className="ri-user-line"></i></p>
                                {!user ? (<>
                                    <p className="text-white cursor-pointer" onClick={handleShowLogin}>Đăng nhập</p>
                                    <p className="text-white">|</p>
                                    <p className="text-white cursor-pointer" onClick={handleShowRegister}>Đăng ký</p>
                                </>) : (<>  <p className="text-white cursor-pointer" onClick={() => setIsShowSectionChangePassword(!isShowSectionChangePassword)}>Chào {user.username}</p>
                                    <p className="text-white">|</p>
                                    <p className="text-white cursor-pointer" onClick={logout}>Đăng xuất</p></>)}
                                {isShowSectionChangePassword && (<div className="absolute w-full -bottom-14 z-10 rounded-sm" ref={ref} >
                                    <div className="h-5 w-full bg-transparent">
                                    </div>
                                    <div className="flex gap-2 bg-white border py-1 rounded-sm px-2" onClick={handleShowChangePassword}>
                                        <span><i className="ri-pencil-fill"></i></span>
                                        <span>Đổi mật khẩu</span>
                                    </div>
                                    {/* <div className="w-5 h-8  bg-transparent">
                                    </div> */}

                                    {/* <div className="absolute -top-1 w-0 h-0 border-b-[6px] border-white border-r-[6px] border-r-transparent left-0"></div> */}
                                </div>)}

                            </div>
                        </div>
                        <div className="max-md:col-span-1 h-full flex items-center justify-center py-1 md:hidden relative">
                            <span className="text-white text-2xl" onClick={() => { window.location.href = 'thanh-toan' }}><i className="ri-shopping-cart-line"></i></span>
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
                                    handleShowForgotPassword={handleShowForgotPassword}
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

                        {
                            isShowForgotPassword && (
                                <ForgotPassword
                                    initialValues={initialForgotPassword}
                                    onSubmit={handleForgotPassword}
                                    messageSuccess={messageForgetPasswordSuccess}
                                />
                            )
                        }

                        {
                            passwordToken && emailParam && isShowResetPassword && (
                                <ResetPassword
                                    initialValues={initialResetPassword}
                                    onSubmit={handleResetPassword}
                                />
                            )
                        }

                    </div>
                </Box>
            </Modal>)
            }

            {user && isShowChangePassword && (<Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} className='md:w-[400px] max-md:w-5/6'>
                    <div className="flex flex-col gap-3">
                        {
                            isShowChangePassword && (
                                <ChangePassword initialValues={initialChangePassword} onSubmit={handleChangePassword} />
                            )
                        }
                    </div>
                </Box>
            </Modal>)
            }


        </>

    );
}
