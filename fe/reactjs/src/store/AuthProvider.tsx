import { createContext, useEffect, useState } from "react";
import authApi from "../api/authApi";
import { User } from "../models";
import { toast } from "react-toastify";

interface Props {
    children: React.ReactNode;
}

interface AuthContextValue {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    test: string;
    isLoggedOut: boolean;
    isShowLoginProvider: boolean;
    isShowChangePasswordProvider: boolean;
    handleShowLogin: () => void;
    handleResetLogin:  () => void;
    handleShowChangePassword: () => void;
    handleResetChangePassword: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [isShowLoginProvider, setIsShowLoginProvider] = useState(false);
    const [isShowChangePasswordProvider, setIsShowChangePasswordProvider] = useState(false);

    const test = 'test';

    const getUserProfile = async (token: string) => {
        try {
            const userProfile = await authApi.getProfile(token);
            if (userProfile.role?.name === 'user') {
                setUser(userProfile)
            }
            else {
                setUser(null)
            }
        } catch (error) {
            localStorage.removeItem('accessToken')
        }
    }

    const handleShowLogin = () => {
        setIsShowLoginProvider(true);
    }

    const handleResetLogin = () => {
        setIsShowLoginProvider(false);
    }

    const handleShowChangePassword = () => {
        setIsShowChangePasswordProvider(true);
    }

    const handleResetChangePassword = () => {
        setIsShowChangePasswordProvider(false);
    }

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('accessToken')
            if (token) {
                getUserProfile(token)
            }
        })();
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const { accessToken } = await authApi.login({ email, password })
            localStorage.setItem('accessToken', accessToken);
            await getUserProfile(accessToken);
            setIsLoggedOut(false);
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

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        setIsLoggedOut(true);
    };

    const authContextValue: AuthContextValue = {
        user,
        login,
        logout,
        isLoggedOut,
        isShowLoginProvider,
        isShowChangePasswordProvider,
        handleShowLogin,
        handleResetLogin,
        handleShowChangePassword,
        handleResetChangePassword,
        test
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;

}
export default AuthProvider;