"use client";

import { User } from "@prisma/client";

import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext<User | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  useEffect(() => {
    fetch("/api/auth").then(async (res) => {
      const { user } = await res.json();
      setUser(user);
    });
  }, []);
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export const useGetUser = () => {
  return useContext(userContext);
};
