import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { addreservation, deletereservation, updatereservation } from "./reservationAPI";

const initialState = {
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addreservation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addreservation.fulfilled, (state, action) => {
        state.status = "idle";
        message.success("Reservation added successfully");
      })
      .addCase(addreservation.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload?.message);
      });
      
      builder
      .addCase(deletereservation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletereservation.fulfilled, (state, action) => {
        state.status = "idle";
        message.success("Reservation Deleted successfully");
      })
      .addCase(deletereservation.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });
      
      builder
      .addCase(updatereservation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatereservation.fulfilled, (state, action) => {
        state.status = "idle";
        message.success("Reservation status updated successfully");
      })
      .addCase(updatereservation.rejected, (state, action) => {
        state.status = "failed";
        message.error(action?.payload.message);
      });
  },
});

export default reservationSlice.reducer;
