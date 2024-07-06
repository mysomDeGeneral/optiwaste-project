"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { login, logout, register, getUserProfile, updateUserProfile, deleteUserProfile } from '@/apis/auth';
import axios from 'axios';

const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();


    const handleLogin = async (data) => {
        try {
            const response = await login(data);
            if (response) {
                localStorage.setItem('token', response.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
                setUser(response);
                router.push('/dashboard');
            }else{
                console.error("Invalid response from the server")
            }
            
        }  catch (error) {
            console.error("login failed(context):", error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleRegister = async (data) => {
        try {
            const response = await register(data);
            const { token , userData } = response;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
            setUser(userData);
            router.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const userProfile = await getUserProfile(token);
            setUser(userProfile);
          } else {
            console.error('User token not found.');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
        }
      };

    useEffect(() => {
        fetchUserProfile();       
    }, []);  

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleRegister, fetchUserProfile, updateUserProfile, deleteUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

