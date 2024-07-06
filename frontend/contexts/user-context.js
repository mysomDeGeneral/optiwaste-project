"use client"; 
import { createContext, useState, useEffect } from 'react';
import { getUsers } from "@/apis/api";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setAllUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ allUsers }}>
      {children}
    </UserContext.Provider>
  );
}
