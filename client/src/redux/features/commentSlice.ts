import { createSlice } from "@reduxjs/toolkit";
import { getAllComments, createComment } from "../thunk/commentThunks";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
