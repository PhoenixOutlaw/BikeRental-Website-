import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/axiosconfig";
import { validjwt } from "../../../utils/fnc";
import { getallbikes } from "../bikes/bikeAPI";



export const addreservation = createAsyncThunk(
  "reservation/add",
  async (payload, { rejectWithValue, dispatch, getState }) => {
    const { from, to } = getState().bike.filter;
    try {
      const res = (
        await api.post(`/reservation/${payload.id}`, {
          from,
          to,
        })
      ).data;
      validjwt(() => dispatch(getallbikes({})));
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatereservation = createAsyncThunk(
  "reservation/update",
  async (payload, { rejectWithValue, dispatch, getState }) => {
    try {
      const res = (
        await api.patch(`/reservation/${payload.id}`, payload.updates)
      ).data;
      if(payload.success) {
        payload.success()
      }
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletereservation = createAsyncThunk(
  "reservation/delete",
  async (payload, { rejectWithValue, dispatch, getState }) => {
    try {
      const res = (await api.delete(`/reservation/${payload.id}`)).data;

      if(payload.success) {
        payload.success()
      }
      validjwt(() => dispatch(getallbikes({})));
      return res;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response.data);
    }
  }
);
