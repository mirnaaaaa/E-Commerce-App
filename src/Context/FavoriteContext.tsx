import React, { createContext, useEffect, useState } from "react";
import { ProductType } from "../Type";

type ChildrenType = {
  children: React.ReactNode;
};

export type FavoriteType = {
  favoriteList: ProductType[];
  setFavoriteList: React.Dispatch<ProductType[]>;
  addToFavorite: (item: ProductType) => void;
  removeFromFav: (item: ProductType) => void;
};
export const FavoriteContext = createContext<FavoriteType | null>(null);

export const FavoriteContextProvider = ({ children }: ChildrenType) => {
  const [favoriteList, setFavoriteList] = useState<ProductType[]>(() => {
    const storedValues = localStorage.getItem("favoriteList");
    return storedValues ? JSON.parse(storedValues) : [];
  });
  console.log();
  useEffect(() => {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  }, [favoriteList]);

  useEffect(() => {
    const list = localStorage.getItem("favoriteList");
    if (list) {
      setFavoriteList(JSON.parse(list));
    }
  }, []);

  const addToFavorite = (item: ProductType): void => {
    setFavoriteList([...favoriteList, { ...item }]);
  };

  const removeFromFav = (item: ProductType): void => {
    const remove = favoriteList?.filter((x) => x.id !== item.id);
    setFavoriteList(remove);
  };

  const value = {
    favoriteList,
    setFavoriteList,
    addToFavorite,
    removeFromFav
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
