"use client";

import UserInterface from "@/Types/User.interface";
import { ENV_VAR } from "@/configs/env.config";
import { FC, createContext, useEffect, useState } from "react";

interface UserContextInterface {
  user: UserInterface | null;
  setUser: (user: UserInterface) => void;
  fetchUser:()=>Promise<void>;
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => false,
  fetchUser:  async () => {
    throw new Error('fetchUser not implemented');
  },
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  
  
  const fetchUser = async () => {
        try {
      const res = await fetch(`${ENV_VAR.SERVER_URL}/auth/authenticate`,{
        method:"POST",
        credentials:"include"
      });
      if (res.status < 300) {
        const data = await res.json();
        const newUser:UserInterface = {
            userId:data?.userId,
            emailId:data?.emailId,
            authentication:{
                tokenVersion:data?.tokenVersion
            }
        }
        data && setUser(newUser);

      } else {
        setUser(null);
      }
    } catch (error) {
        setUser(null);
    }
};
  useEffect(() => {

    // fetchUser();
    console.log("Updated user")
    console.log(user); // This will show the updated state
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
