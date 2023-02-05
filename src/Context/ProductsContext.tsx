import React, { createContext, useEffect, useState } from "react";
import { ProductType } from "../Type";
type ChildrenType = {
  children: React.ReactNode;
};
export type ProductsType = {
  ourShop: ProductType[];
  setOurShop: React.Dispatch<React.SetStateAction<ProductType[]>>;
  isLoading: boolean;
};
export const ProductsContext = createContext<ProductsType | null>(null);

export const ProductsContextProvider = ({ children }: ChildrenType) => {
  const [ourShop, setOurShop] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const q = data.products.map((x: any) => ({
          ...x
        }));
        setOurShop(q);
        setIsLoading(false);
      });
  }, []);

  const value = {
    ourShop,
    setOurShop,
    isLoading
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
