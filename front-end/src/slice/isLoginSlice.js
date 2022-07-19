import { createSlice } from "@reduxjs/toolkit";

export const isLoginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
  },
  reducers: {
    trueLogin: (state) => {
      console.log("----");

      state.isLogin = true;
    },
    falseLogin: (state) => {
      console.log("----");
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { trueLogin, falseLogin } = isLoginSlice.actions;

export default isLoginSlice.reducer;
