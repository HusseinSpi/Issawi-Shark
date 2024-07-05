import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
} from "../thunk/projectThunks";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = Array.isArray(action.payload)
          ? action.payload
          : state.data;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.map((project) =>
          project.id === action.payload.id ? action.payload : project
        );
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer;
