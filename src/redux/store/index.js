import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/Counter.slice";
import productReducer from "../slice/Product.slice";
import cartReducer from "../slice/cart.slice";

export const store = configureStore({
  reducer: { counterReducer, productReducer, cartReducer },
});
