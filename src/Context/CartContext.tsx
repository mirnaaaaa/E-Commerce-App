import { ProductType } from "../Type";
import React, { createContext, useEffect, useState } from "react";
type Cart = {
  children: React.ReactNode;
};
export type CartType = {
  cart: ProductType[];
  setCart: React.Dispatch<React.SetStateAction<ProductType[]>>;
  addToCart: (x: ProductType) => void;
  sum: number;
  total: number | string;
  //setTotal:  React.Dispatch<React.SetStateAction<number>>;
  // setSum:  React.Dispatch<React.SetStateAction<number>>;
};
export const CartContext = createContext<CartType | null>(null);

export const CartContextProvider = ({ children }: Cart) => {
  const [cart, setCart] = useState<ProductType[]>(() => {
    const storedValues = localStorage.getItem("cart");
    return storedValues ? JSON.parse(storedValues) : [];
  });
  const [sum, setSum] = useState<number>(0);
  const [total, setTotal] = useState<number | string>(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const carts = localStorage.getItem("cart");
    if (carts) {
      setCart(JSON.parse(carts));
    }
  }, []);

  const addToCart = (item: ProductType) => {
    const selected = cart.find((x) => x.id === item.id);
    if (selected) {
      setCart(
        cart.map((x) =>
          x.id === item.id
            ? { ...selected, quantity: selected.quantity + 1 }
            : x
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  useEffect(() => {
    if (cart) {
      let sum = 0;
      cart.map((x) => {
        return (sum += x.quantity);
      });
      setSum(sum);
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      let sum = 0;
      cart.map((x) => {
        return (sum +=
          (x.quantity * (x.price * x.discountPercentage)) / 100 + 50);
      });
      setTotal(sum.toFixed(2));
    }
  }, [cart]);

  const value = {
    cart,
    setCart,
    addToCart,
    sum,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
