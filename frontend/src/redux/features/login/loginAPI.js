import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../../axios/axiosconfig";

export const login = createAsyncThunk(
  "log/signin",
  async (payload, { rejectWithValue }) => {
    try {
      const res = (await api.post("/signin", payload.data)).data;
      Cookies.set("token", res.jwttoken);
      payload.success();
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "log/register",
  async (payload, { rejectWithValue }) => {
    delete payload.data.repassword;
    payload.data.role = "regular";
    try {
      const res = (await api.post("/register", payload.data)).data;
      Cookies.set("token", res.jwttoken);
      payload.success();
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getloggeduser = createAsyncThunk(
  "log/getloggeduser",
  async (payload, { rejectWithValue, getstate }) => {
    try {
      const res = (await api.get("/logged")).data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
