"use client"
import { createContext, useState, useContext } from 'react';
import React, {useEffect} from 'react';
import { getRequests, createRequest, getRequest } from '../apis/api';
import { useAuth } from './auth-context';
import { getTokenFromCookie } from './auth-context';

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [allRequests, setAllRequests] = useState([]);
  const [request, setRequest] = useState([]);
  const token = getTokenFromCookie();
  

    const fetchRequests = async () => {
        // const token = getTokenFromCookie();
        const response = await getRequests(token);
        setAllRequests(response);
    }

    const createNewRequest = async (request) => {
        // const token = getTokenFromCookie();
        const response = await createRequest(token, request);
        setRequest(response);
    }

    const fetchRequest = async (id) => {
      const response = await getRequest(token, id);
      setRequest(response);
    }


    useEffect(() => {
        fetchRequests();
    }, []);

  return (
    <RequestContext.Provider value={{ allRequests, createNewRequest, request, fetchRequest }}>
      {children}
    </RequestContext.Provider>
  );
}

export const useRequest = () => useContext(RequestContext);

