import React, { createContext, useState } from "react";
import { ProductType } from "../Type";
type ChildrenType = {
  children: React.ReactNode;
};

type shipping = {
    FirstName: string;
    LastName: string;
    Mobile: number;
    City: string;
    State: string;
    Address: string | number;
  }
export type OrdersType = {
  orders: order[];
  setOrders: React.Dispatch<React.SetStateAction<order[]>>;
};
export type order = {
  item: ProductType[];
  shippingDetails: shipping;
  Id: string | number;
  cash:  number;
  totalItems: number;
  time: any;
}
export const OrdersContext = createContext<OrdersType | null>(null);

export const OrdersContextProvider = ({ children }: ChildrenType) => {
  const [orders, setOrders] = useState<order[]>([]);

  const value = {
    orders,
    setOrders
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};
