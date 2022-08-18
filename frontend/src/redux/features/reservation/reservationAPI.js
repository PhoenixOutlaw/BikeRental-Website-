import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/axiosconfig";

export const addreservation = createAsyncThunk(
  "reservation/add",
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload)
      const res = (await api.post(`/reservation/${payload.id}`,{duration:payload.duration})).data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatereservation = createAsyncThunk(
  "reservation/update",
  async (payload, { rejectWithValue }) => {
    try {
      const res = (await api.patch(`/reservation/${payload.id}`,payload.updates)).data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletereservation = createAsyncThunk(
  "reservation/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = (await api.delete(`/reservation/${id}`)).data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
