import { createSlice } from "@reduxjs/toolkit";
const authIntialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authIntialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
