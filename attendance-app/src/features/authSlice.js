import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const login = createAsyncThunk("auth/login", async (form) => {
  const res = await API.post("/auth/login", form);
  return res.data;
});

export const register = createAsyncThunk("auth/register", async (form) => {
  const res = await API.post("/auth/register", form);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
