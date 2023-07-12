import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("shop/getProducts", async () => {
  const res = await axios.get("https://dummyjson.com/products");
  const result = res.data.products.map((x: any) => ({
    ...x,
    quantity: 1
  }));
  return [...result];
});

const initialState = {
  value: {
    id: "",
    isLoading: true,
    products: []
  }
};

const OrderSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getId: (state, action) => {
      state.value.id = action.payload.id;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.value.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state: any, action) => {
        state.value.isLoading = false;
        state.value.products = action.payload;
      });
  }
});

export const { getId } = OrderSlice.actions;

export default OrderSlice.reducer;
