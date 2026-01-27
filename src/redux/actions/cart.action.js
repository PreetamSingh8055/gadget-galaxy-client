import API from "@/API/Interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//  create cart items:
export const createCartItems = createAsyncThunk(
  "cart/createCarItems",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await API.post("/cart/add", {
        productId,
        quantity,
      });
      toast.success("Cart added");
      await thunkAPI.dispatch(fetchCartDetails());
      return res.data.data; // return updated cart
    } catch (error) {
      toast.error(error.response?.data?.message || "create failed");
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchCartDetails = createAsyncThunk(
  "cart/fetchCartDetails",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/cart/");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// UPDATE CART ITEM (quantity update)
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await API.put("/cart/update", {
        productId,
        quantity,
      });
      await thunkAPI.dispatch(fetchCartDetails());
      toast.success("Cart updated");
      return res.data.data; // return updated cart
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// DELETE CART ITEM
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (productId, thunkAPI) => {
    try {
      const res = await API.delete(`/cart/delete/${productId}`);
      await thunkAPI.dispatch(fetchCartDetails());
      toast.success("Item removed");
      return res.data.data; // updated cart return
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
