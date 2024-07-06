import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";
import { createRecentActivity } from "./recentActivityThunks";

axios.defaults.withCredentials = true;

interface CommentData {
  id?: string;
  content: string;
}

interface AxiosError {
  response: {
    data: any;
  };
}

export const getAllComments = createAsyncThunk(
  "comment/fetchComment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("comments");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response.data);
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (commentData: CommentData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("comments", commentData);
      toast.success("Comment created successfully");
      dispatch(
        createRecentActivity({
          type: "comment",
          description: `New comment created: ${commentData.content}`,
        })
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to create comment");
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response.data);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (commentData: CommentData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/comments/${commentData.id}`,
        commentData
      );
      console.log(commentData);
      dispatch(
        createRecentActivity({
          type: "comment",
          description: `Edit comment: ${commentData.content}`,
        })
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to update comment");
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response.data);
    }
  }
);

export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async (commentId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/comments/${commentId}/like`);
      dispatch(
        createRecentActivity({
          type: "comment",
          description: `Like comment: ${commentId}`,
        })
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to like comment");
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      dispatch(
        createRecentActivity({
          type: "comment",
          description: `Delete comment: ${commentId}`,
        })
      );
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment");
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response.data);
    }
  }
);
