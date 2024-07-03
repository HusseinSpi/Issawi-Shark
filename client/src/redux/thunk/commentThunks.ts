import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const getAllComments = createAsyncThunk(
  "comment/fetchComment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("comments");
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post("comments", commentData);
      toast.success("Comment created successfully");
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (commentData: { id: string; content: string; rating: number }) => {
    const response = await axios.put(
      `/comments/${commentData.id}`,
      commentData
    );
    return response.data;
  }
);

export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async (commentId: string) => {
    const response = await axios.put(`/comments/${commentId}/like`);
    return response.data;
  }
);
