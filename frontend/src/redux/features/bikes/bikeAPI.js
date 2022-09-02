import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/axiosconfig";
import { currentbike } from "./bikeSlice";

export const getallbikes = createAsyncThunk(
  "bike/allbikes",
  async (payload, { rejectWithValue, getState }) => {
    const filter = getState().bike?.filter;
    try {
      const query =
        (filter.name ? `&name=${filter.name}` : "") +
        (filter.rating ? `&rating=${filter.rating}` : "") +
        (filter.model ? `&model=${filter.model}` : "") +
        (filter.color ? `&color=${filter.color}` : "") +
        (filter.location ? `&location=${filter.location}` : "") +
        (filter.from ? `&from=${filter.from}` : "") +
        (filter.to ? `&to=${filter.to}` : "");
      const res = (
        await api.get(
          `/bike?page=${payload.page}&limit=${payload.limit}${query}`
        )
      ).data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getbike = createAsyncThunk(
  "bike/getbike",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = (await api.get(`/bike/${id}`)).data;
      dispatch(currentbike(res));
      return null;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
