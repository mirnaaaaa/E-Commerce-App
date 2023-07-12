import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../Types/ProductsType";

interface CartType {
  cart: ProductType[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : [],
  totalQuantity: 0,
  totalAmount: 0
} as CartType;

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartType, action: PayloadAction<ProductType>) => {
      const selected = state.cart.find(
        (x: ProductType) => x.id === action.payload.id
      );
      if (selected) {
        selected.quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem: (state: CartType, action: PayloadAction<ProductType>) => {
      state.cart.map((x: ProductType) =>
        x.id === action.payload.id ? { ...x, quantity: (x.quantity -= 1) } : x
      );
    },
    deleteItem: (state: CartType, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (x: ProductType) => x.id !== action.payload
      );
    },
    totalOfCart: (state: CartType) => {
      let sum = 0;
      state.cart.map((x: ProductType) => {
        return (sum += x.quantity);
      });
      let amount = 0;
      state.cart.map((x: ProductType) => {
        return (amount +=
          (x.quantity * (x.price * x.discountPercentage)) / 100 + 50);
      });
      state.totalAmount = amount;
      state.totalQuantity = sum;
    },
    Logout: (state) => {
      state.cart = [];
    }
  }
});

export const { addToCart, removeItem, deleteItem, totalOfCart, Logout } =
  CartSlice.actions;

export default CartSlice.reducer;
