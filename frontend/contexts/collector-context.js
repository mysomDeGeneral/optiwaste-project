"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import { getCollectors, updateCollectorProfile } from "@/apis/api";
import { getTokenFromCookie } from './auth-context';

export const CollectorContext = createContext();

export const CollectorProvider = ({ children }) => {
    const [allCollectors, setAllCollectors] = useState([]);
    
        const fetchCollectors = async () => {
            const response = await getCollectors();
            setAllCollectors(response);
        }

        const updateProfile = async (data) => {
            const token = getTokenFromCookie();
            const response = await updateCollectorProfile(token, data);
            return response;
        }
    
        useEffect(() => {
            fetchCollectors();
        }, []);
    
    return (
        <CollectorContext.Provider value={{ allCollectors, updateProfile }}>
        {children}
        </CollectorContext.Provider>
    );
    }

    export function useCollector() {
        const context = useContext(CollectorContext);
        if (!context) {
            throw new Error("useCollector must be used within an AuthProvider");
        }
        return context;
    };