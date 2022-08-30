import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/axiosconfig";
import { getbike } from "../bikes/bikeAPI";

export const addreview = createAsyncThunk(
  "review/add",
  async (payload, { rejectWithValue ,dispatch,getState }) => {
    try {
      const res = (await api.post(`/review/${payload.id}`, payload.data)).data;
      dispatch(getbike(getState().bike.currentbike.id));
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatereview = createAsyncThunk(
  "review/update",
  async (payload, { rejectWithValue ,dispatch,getState }) => {
    try {
      const res = (
        await api.patch(`/review/${payload.id}`, {
          review: payload.review,
          rating: payload.rating,
        })
      ).data;
      dispatch(getbike(getState().bike.currentbike.id));
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletereview = createAsyncThunk(
  "review/delete",
  async (id, { rejectWithValue ,dispatch,getState }) => {
    try {
      const res = (await api.delete(`/review/${id}`)).data;
      dispatch(getbike(getState().bike.currentbike.id));
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
