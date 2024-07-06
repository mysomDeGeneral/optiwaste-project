"use client";
import { createContext, useState, useEffect } from 'react';
import { getCollectors } from "@/apis/api";

export const CollectorContext = createContext();

export const CollectorProvider = ({ children }) => {
    const [allCollectors, setAllCollectors] = useState([]);
    
        const fetchCollectors = async () => {
            const response = await getCollectors();
            setAllCollectors(response);
        }
    
        useEffect(() => {
            fetchCollectors();
        }, []);
    
    return (
        <CollectorContext.Provider value={{ allCollectors }}>
        {children}
        </CollectorContext.Provider>
    );
    }