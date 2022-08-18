import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/axiosconfig";

export const addreview = createAsyncThunk(
  "review/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = (await api.post(`/review/${payload.id}`, payload.data)).data;
      payload.success();
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatereview = createAsyncThunk(
  "review/update",
  async (payload, { rejectWithValue }) => {
    try {
      const res = (
        await api.patch(`/review/${payload.id}`, {
          review: payload.review,
          rating: payload.rating,
        })
      ).data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletereview = createAsyncThunk(
  "review/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = (await api.delete(`/review/${id}`)).data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
