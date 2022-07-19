import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    init: (state, payload) => {
      state.product = payload.payload;
    },
    create: (state, payload) => {
      let result = payload.payload;
      state.product.push(result);
    },
    del: (state, payload) => {
      console.log(payload.payload.id);
      state.product = state.product.filter((x) => x.id !== payload.payload.id);
      axios.delete(`/del/${payload.payload.id}`);
    },
    edit: (state, payload) => {
      const index = state.product.findIndex((x) => x.id == payload.payload.key);
      const result = payload.payload;
      state.product[index].product_name = result.product_name;
      state.product[index].category = result.category;
      state.product[index].stock_left = result.stock_left;
      axios.put(`/update/${payload.payload.key}`, {
        product_name: result.product_name,
        category: result.category,
        stock_left: result.stock_left,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { init, create, del, edit } = productSlice.actions;

export default productSlice.reducer;
