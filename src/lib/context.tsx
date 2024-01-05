/* eslint-disable no-console */

import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export type AuthUser = {
  displayName: string;
  uid: string;
};

type ContextSessionProps = {
  userData: AuthUser | null;
  setUserData: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

const useUserData = () => {
  const [userData, setUserData] = useState<AuthUser | null>(null);
  useEffect(() => {
    const checkAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          displayName: user.displayName || "",
          uid: user.uid || "",
        });
      } else {
        setUserData(null);
      }
      return () => checkAuth;
    });
  }, []);
  return { userData, setUserData };
};

export const UserContext = createContext<ContextSessionProps | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const { userData, setUserData } = useUserData();
  // const [user, setUser] = useState<AuthUser | null>(null)
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
