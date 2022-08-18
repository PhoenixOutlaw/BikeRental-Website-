import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/axiosconfig";

export const getallbikes = createAsyncThunk(
  "bike/allbikes",
  async (payload, { rejectWithValue }) => {
    try {
      const query = `${payload.search?`&search=${payload.search}`:""}${payload.rating?`&rating=${payload.rating}`:""}`
      console.log(query)
      const res = (await api.get(`/bike?page=${payload.page}&limit=${payload.limit}${query}`)).data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getbike = createAsyncThunk(
  "bike/getbike",
  async (payload, { rejectWithValue }) => {
    try {
      const res = (await api.get(`/bike/${payload.id}`)).data;
      payload.success(res);
      return null;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
