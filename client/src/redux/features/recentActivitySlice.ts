import { createSlice } from "@reduxjs/toolkit";
import {
  getRecentActivity,
  createRecentActivity,
} from "../thunk/recentActivityThunks";

const recentActivitySlice = createSlice({
  name: "recentActivity",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecentActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRecentActivity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(getRecentActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createRecentActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRecentActivity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload.data];
      })
      .addCase(createRecentActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default recentActivitySlice.reducer;
