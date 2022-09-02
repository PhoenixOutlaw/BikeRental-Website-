import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { getallbikes, getbike } from "./bikeAPI";

const initialState = {
  availablebikes: undefined,
  unavailablebikes: undefined,
  filter:undefined,
  total: 0,
  currentbike:undefined,
  status: "idle",
};

export const bikeSlice = createSlice({
  name: "bike",
  initialState,
  reducers: {
   currentbike:(state,action)=>{
    state.currentbike = action.payload
   },
   newfilter:(state,action)=>{
    state.filter = action.payload
   },
   resetfilter:(state)=>{
    state.filter = undefined;
    state.availablebikes = undefined;
    state.unavailablebikes = undefined;
    
   }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getallbikes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallbikes.fulfilled, (state, action) => {
        state.status = "idle";
        if(action.payload.data?.available)
        state.availablebikes = action.payload.data.available;
        if(action.payload.data?.unavailable)
        state.unavailablebikes = action.payload.data.unavailable;
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
  },
});

export const { currentbike,newfilter,resetfilter } = bikeSlice.actions;
export const selectCount = (state) => state.counter.value;
export default bikeSlice.reducer;
