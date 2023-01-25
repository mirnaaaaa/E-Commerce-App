import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [sum, setSum] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    if (cart) {
      let sum = 0;
      cart.map((x) => {
        return  sum += x.quantity;
      });

      setSum(sum);
    }
  }, [cart]);
  useEffect(() => {
    if (cart) {
      let sum = 0;
      cart.map((x) => {
       return sum += (x.quantity * (x.price * x.discountPercentage)) / 100 + 50;
      });

      setTotal(sum.toFixed(2));
    }
  }, [cart]);
  const addToCart = (item) => {
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
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1
        }
      ]);
    }
  };

  const value = {
    cart,
    setCart,
    addToCart,
    sum,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
