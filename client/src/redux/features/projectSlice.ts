import { createSlice } from "@reduxjs/toolkit";
import { getAllProjects } from "../thunk/projectThunks";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
