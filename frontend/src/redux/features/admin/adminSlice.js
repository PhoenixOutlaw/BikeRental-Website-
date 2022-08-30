import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { addbike, deletebike, updatebike } from "./apis/bikeAPI";
import { deleteuser, getalluser, updateuser } from "./apis/userapi";

const initialState = {
  users: [],
  total:0
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addbike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addbike.fulfilled, (state, action) => {
        state.status = "idle";
        message.success("Bike Added");
      })
      .addCase(addbike.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload?.message);
      });

    builder
      .addCase(deletebike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletebike.fulfilled, (state, action) => {
        state.status = "idle";
        message.success("Bike Deleted");
      })
      .addCase(deletebike.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });

    builder
      .addCase(updatebike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatebike.fulfilled, (state, action) => {
        state.status = "idle";
        message.success("Bike Updated");
      })
      .addCase(updatebike.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });

    builder
      .addCase(getalluser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getalluser.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(getalluser.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload?.message);
      });

    builder
      .addCase(deleteuser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.status = "idle";
        message.success("user Deleted");
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });

    builder
      .addCase(updateuser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        state.status = "idle";
        message.success("user Updated");
      })
      .addCase(updateuser.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });
  },
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
