"use client"
import { createContext, useState, useContext } from 'react';
import React, {useEffect} from 'react';
import { getRequests } from '../apis/api';

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [allRequests, setAllRequests] = useState([]);

    const fetchRequests = async () => {
        const response = await getRequests();
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

