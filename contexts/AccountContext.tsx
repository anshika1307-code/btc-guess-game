"use client";
import React, { createContext, useState,useEffect } from 'react';
import { UserProps, CreateContextProps, CreateUserContextProps } from '@/types/userAccount';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

// export const AccountContext = createContext<CreateUserContextProps>({
//   user: undefined,
//   setUser: () => {},
// });

export const AccountContext = createContext<{
  user: UserProps | undefined;
  setUser: (user: UserProps | undefined) => void;
}>({
  user: undefined,
  setUser: () => {},
});


export default function AccountContextProvider({
  children
}: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  useEffect(() => {
    const cookies = parseCookies();
  
    if (cookies.userData) {
      try {
        const storedUser = JSON.parse(cookies.userData);
        setUser(storedUser);
      } catch (e) {
        console.error("Failed to parse userData cookie:", e);
      }
    }
  }, []);
  

  const updateUser = (newState: UserProps | undefined) => {
    if (newState?.isConnected) {
        setCookie(null, 'userData', JSON.stringify(newState), {
            maxAge: 30 * 24 * 60 * 60, 
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          });
    } else if (newState?.isConnected === false) {
      destroyCookie(null, 'walletConnected', { path: '/' });
    }
    setUser(newState);
  };

  return (
    <AccountContext.Provider value={{ user, setUser:updateUser }}>
      {children}
    </AccountContext.Provider>
  );
}