import  React, { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext(null);

export const ProductsContextProvider = ({children}) => {
    const [ourShop, setOurShop] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

   
    useEffect(() => {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
          const q = data.products.map((x) => ({
            ...x,
            isFav: false
          }));
          setOurShop(q);
            setIsLoading(false);
        });
    }, []);

 
const value = {
    ourShop,
    setOurShop,
    isLoading
}

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}