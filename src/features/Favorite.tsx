import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../Types/ProductsType";

interface FavoriteType {
  favorite: ProductType[];
}

const initialState = {
  favorite:  localStorage.getItem("favorite")
  ? JSON.parse(localStorage.getItem("favorite") || "")
 :
 [],
} as FavoriteType;

const FavoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFav: (state: FavoriteType, action: PayloadAction<ProductType>) => {
      state.favorite.push(action.payload);
      localStorage.setItem("favorite", JSON.stringify(state.favorite));

    },
    removeFromFav: (state: FavoriteType, action: PayloadAction<number>) => {
      state.favorite = state.favorite.filter(
        (x: ProductType) => x.id !== action.payload
      );
    },
    clearFav: (state: FavoriteType) => {
      state.favorite = [];
    },
    
  }
});

export const { addToFav, removeFromFav, clearFav } = FavoriteSlice.actions;

export default FavoriteSlice.reducer;
