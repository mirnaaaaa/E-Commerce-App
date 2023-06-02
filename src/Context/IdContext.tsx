import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

type ChildrenType = {
  children: React.ReactNode;
};

export type UserContextType = {
  userId: string | number | null;
  setUserId: React.Dispatch<React.SetStateAction<string | number | null>>;
};

export const IdContext = createContext<UserContextType | null>(null);

export const IdContextProvider = ({ children }: ChildrenType) => {
  const [userId, setUserId] = useState<string | number | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const value = {
    userId,
    setUserId
  };

  return <IdContext.Provider value={value}>{children}</IdContext.Provider>;
};
