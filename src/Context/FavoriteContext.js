import React, { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext(null);

export const FavoriteContextProvider = ({ children }) => {
  const [favoriteList, setFavoriteList] = useState(
    JSON.parse(localStorage.getItem("favoriteList")) || []
  );
  useEffect(() => {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  }, [favoriteList]);
  const addToFavorite = (item) => {
    setFavoriteList([...favoriteList, { ...item }]);
  };

  const removeFromFav = (item) => {
    const remove = favoriteList.filter((x) => x.id !== item.id);
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
