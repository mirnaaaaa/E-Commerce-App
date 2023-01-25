import  React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
 
export const IdContext  = createContext(null);
 
export const IdContextProvider = ({children}) => {
    const [userId, setUserId] = useState(null);

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
}

    return <IdContext.Provider value={value}>{children}</IdContext.Provider>
}