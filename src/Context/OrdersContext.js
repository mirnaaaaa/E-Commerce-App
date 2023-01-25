import React, { createContext, useState } from "react";
export const OrdersContext = createContext(null);

export const OrdersContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  
  const value = {
    orders,
    setOrders
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};
