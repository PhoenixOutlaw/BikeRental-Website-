import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../axios/axiosconfig";
import { getallbikes } from "../../bikes/bikeAPI";

export const addbike = createAsyncThunk(
  "admin/bike_add",
  async (payload, { rejectWithValue,dispatch }) => {
    try {
      const res = (await api.post(`/bike`, payload)).data;
      dispatch(getallbikes({}))
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatebike = createAsyncThunk(
  "admin/bike_update",
  async (payload, { rejectWithValue,dispatch }) => {
    try {
      const res = (await api.patch(`/bike/${payload.id}`, payload.updates))
        .data;
      dispatch(getallbikes({}))
        return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletebike = createAsyncThunk(
  "admin/bike_delete",
  async (id, { rejectWithValue,dispatch }) => {
    try {
      const res = (await api.delete(`/bike/${id}`)).data;
      dispatch(getallbikes({}))
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
