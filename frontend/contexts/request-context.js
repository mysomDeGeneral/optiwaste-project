"use client"
import { createContext, useState, useContext } from 'react';
import React, {useEffect} from 'react';
import { getRequests } from '../apis/api';
import { useAuth } from './auth-context';
import { getTokenFromCookie } from './auth-context';

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [allRequests, setAllRequests] = useState([]);
  

    const fetchRequests = async () => {
        const token = getTokenFromCookie();
        const response = await getRequests(token);
        setAllRequests(response);
    }

    useEffect(() => {
        fetchRequests();
    }, []);

  return (
    <RequestContext.Provider value={{ allRequests }}>
      {children}
    </RequestContext.Provider>
  );
}

export const useRequest = () => useContext(RequestContext);

