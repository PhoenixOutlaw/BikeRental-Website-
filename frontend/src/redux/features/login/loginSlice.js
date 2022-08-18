import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import Cookies from "js-cookie";
import { getloggeduser, login, register } from "./loginAPI";

const initialState = {
  user: undefined,
  accessToken: undefined,
  signedIn: false,
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    signin(state) {
      state.signedIn = true;
    },
    signout(state) {
      state.signedIn = false;
      state.user = undefined;
      state.accessToken = undefined;
      Cookies.remove("token")
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        message.success("Login successful");
        state.user = action.payload.user;
        state.accessToken = action.payload.jwttoken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload?.message);
      });

    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "idle";
        message.success("Login successful");
        state.user = action.payload.user;
        state.accessToken = action.payload.jwttoken;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });

    builder
      .addCase(getloggeduser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getloggeduser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(getloggeduser.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });
  },
});

export const { signin, signout } = loginSlice.actions;
export const selectCount = (state) => state.counter.value;
export default loginSlice.reducer;
