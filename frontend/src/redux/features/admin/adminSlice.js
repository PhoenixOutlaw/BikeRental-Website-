import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { addbike, deletebike, updatebike } from "./apis/bikeAPI";

const initialState = {};

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
  },
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
