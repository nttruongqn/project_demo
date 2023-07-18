import { createContext, useEffect, useState } from "react";
import authApi from "../api/authApi";
import { User } from "../models";

interface Props {
    children: React.ReactNode;
}

interface AuthContextValue {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    test: string;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);
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
        } catch (error) {
            console.log("Login Failed")
        }
    }

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
    };

    const authContextValue: AuthContextValue = {
        user,
        login,
        logout,
        test
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;

}
export default AuthProvider;