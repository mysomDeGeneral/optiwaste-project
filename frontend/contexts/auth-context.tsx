"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login, logout, register, getUserProfile } from '@/apis/auth';
import axios from 'axios';
import Cookies from 'js-cookie'


interface AuthContextProps {
    user: any;
    loading: boolean;
    handleLogin: (data: { email: string; password: string }) => Promise<void>;
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

    const handleLogin = async (data: { email: string; password: string }) => {
        try {
            const response = await login(data);
            if (response && response.token) {
                setToken(response.token);
                setTokenInCookie(response.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
                setUser(response);

                console.log("token: ", token);

                const returnUrl = searchParams.get("returnUrl") ?? '/dashboard';
                console.log("returnUrl: ", returnUrl);
                router.refresh();
                router.push(returnUrl);
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
        const token = getTokenFromCookie();
        if (token) {
            setToken(token);
            fetchUserProfile(token);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
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
