import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { getallbikes, getbike } from "./bikeAPI";

const initialState = {
  bikes: [],
  total: 0,
  status: "idle",
};

export const bikeSlice = createSlice({
  name: "bike",
  initialState,
  reducers: {
    // signin(state) {
    //   state.signedIn = true;
    // },
    // signout(state) {
    //   state.signedIn = false;
    //   state.bikes = undefined;
    //   state.accessToken = undefined;
    //   Cookies.remove("token")
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getallbikes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallbikes.fulfilled, (state, action) => {
        state.status = "idle";
        state.bikes = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(getallbikes.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload?.message);
      });

    builder
      .addCase(getbike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getbike.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(getbike.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });

    // builder
    //   .addCase(getloggeduser.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(getloggeduser.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.bikes = action.payload;
    //   })
    //   .addCase(getloggeduser.rejected, (state, action) => {
    //     state.status = "failed";
    //     message.error(action?.payload.message);
    //   });
  },
});

export const { signin, signout } = bikeSlice.actions;
export const selectCount = (state) => state.counter.value;
export default bikeSlice.reducer;
