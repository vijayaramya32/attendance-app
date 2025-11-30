import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const checkIn = createAsyncThunk("attendance/checkIn", async () => {
  const res = await API.post("/attendance/checkin");
  return res.data;
});

export const checkOut = createAsyncThunk("attendance/checkOut", async () => {
  const res = await API.post("/attendance/checkout");
  return res.data;
});

export const myHistory = createAsyncThunk("attendance/history", async () => {
  const res = await API.get("/attendance/my-history");
  return res.data;
});

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: { history: [], today: null },
  extraReducers: (builder) => {
    builder
      .addCase(myHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
