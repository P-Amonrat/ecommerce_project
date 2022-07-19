import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import isLoginSlice from "./slice/isLoginSlice";

export default configureStore({
  reducer: {
    product: productSlice,
    login: isLoginSlice,
  },
});
