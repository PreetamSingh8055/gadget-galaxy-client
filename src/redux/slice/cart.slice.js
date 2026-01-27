import { createSlice } from "@reduxjs/toolkit";
import {
  createCartItems,
  deleteCartItem,
  fetchCartDetails,
  updateCartItem,
} from "../actions/cart.action";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.data = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCartItems.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  fetch
      .addCase(fetchCartDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCartDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE CART (only loading/error)
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE CART (only loading/error)
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
