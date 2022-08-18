import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { addreview, deletereview, updatereview } from "./reviewAPI";

const initialState = {};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addreview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addreview.fulfilled, (state, action) => {
        state.status = "idle";
        message.success(action?.payload);
      })
      .addCase(addreview.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload?.message);
      });

    builder
      .addCase(deletereview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletereview.fulfilled, (state, action) => {
        state.status = "idle";
        message.success(action?.payload);
      })
      .addCase(deletereview.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });

    builder
      .addCase(updatereview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatereview.fulfilled, (state, action) => {
        state.status = "idle";
        message.success(action?.payload);
      })
      .addCase(updatereview.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });
  },
});

export const { modifyreview } = reviewSlice.actions;
export default reviewSlice.reducer;
