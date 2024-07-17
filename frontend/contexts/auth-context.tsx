"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginUser, loginCollector, logout, register, getUserProfile } from '@/apis/auth';
import axios from 'axios';
import Cookies from 'js-cookie'
// import { getUserRole } from '@/middleware';
// import { getTokenFromCookies } from '@/middleware';


interface AuthContextProps {
    user: any;
    loading: boolean;
    token: any;
    handleLogin: (data: { email: string; password: string; isCollector: boolean }) => Promise<void>;
    handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function setTokenInCookie(token: string): void{
    Cookies.set('token', token, { expires: 1, path: '/'});
}


export function getTokenFromCookie(): string | undefined {
    return Cookies.get('token');
}


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleLogin = async (data: { email: string; password: string; isCollector: boolean }) => {
        try {
            let response;
            const { isCollector } = data;
            if (isCollector) {
                response = await loginCollector(data);
            } else {
                response = await loginUser(data);
            }

            if (response && response.data.token) {
                setToken(response.data.token);
                setTokenInCookie(response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                setUser(response);

                const token = getTokenFromCookie();
                console.log("token: ", token);

                // await getUserRole(token ?? '');
                console.log("role(auth-context): ", response.data.role);

                let redirectUrl;

                if(response.data.role === "admin"){
                    redirectUrl = '/dashboard';
                } else if (response.data.role === 'user') {
                    redirectUrl = '/users/request';
                } else if (response.data.role === 'collector') {
                    redirectUrl = '/collector/requests';
                } else {
                    redirectUrl = '/';
                }

                const returnUrl = searchParams.get("returnUrl") ?? redirectUrl;
                console.log("returnUrl: ", returnUrl);

                router.refresh();
                console.log("attempting to redirect to:", returnUrl);
                // window.location.href = returnUrl;
                router.replace(returnUrl);
            } else {
                console.error("Invalid response from the server");
            }
        } catch (error: any) {
            console.error("Login failed: " + error.message);
        }
    };

    const handleLogout = async () => {
        try {
            setToken(null);
            Cookies.remove("token");
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUserProfile = async (token: any) => {
        try {
            const response = await getUserProfile(token);
            setUser(response);
        } catch (error) {
            console.error("Failed to fetch user profile: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Current pathname:", window.location.pathname);
        const token = getTokenFromCookie();
        if (token) {
            setToken(token);
            fetchUserProfile(token);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
