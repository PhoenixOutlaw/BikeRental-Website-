import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/axiosconfig";
import { validjwt } from "../../../utils/fnc";
import { getallbikes, getbike } from "../bikes/bikeAPI";
import { reservation } from "../login/loginSlice";

export const getreservation = createAsyncThunk(
  "reservation/get",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const id = getState().login.user.id;
      const res = (await api.get(`/reservation/${id}`)).data;
      dispatch(reservation(res));
      return null;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      return res;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletereservation = createAsyncThunk(
  "reservation/delete",
  async (payload, { rejectWithValue, dispatch, getState }) => {
    try {
      const res = (await api.delete(`/reservation/${payload.id}`)).data;
      if (payload.type === "admin") {
        dispatch(getbike(getState().bike.currentbike.id));
        return null;
      }
      validjwt(() => dispatch(getreservation({})));
      validjwt(() => dispatch(getallbikes({})));
      return res;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
