"use client"; 
import { createContext, useState, useEffect, useContext } from 'react';
import { getUsers, updateUserProfile } from "@/apis/api";
import { getTokenFromCookie } from './auth-context';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);

  
  const updateProfile = async (data) => {
    const token = getTokenFromCookie();
    const response = await updateUserProfile(token, data);
    return response;
}

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setAllUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ allUsers, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
      throw new Error("useCollector must be used within an AuthProvider");
  }
  return context;
};
