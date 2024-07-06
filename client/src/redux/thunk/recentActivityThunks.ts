import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const getRecentActivity = createAsyncThunk(
  "activity/fetchRecentActivity",
  async () => {
    try {
      const response = await axios.get("recent-activities");
      return response.data;
    } catch (error) {
      toast.error("Failed to get recent activity");
      throw error;
    }
  }
);

export const createRecentActivity = createAsyncThunk(
  "activity/createRecentActivity",
  async (activityData, { rejectWithValue }) => {
    try {
      const response = await axios.post("recent-activities", activityData);
      return response.data;
    } catch (error) {
      toast.error("Failed to create recent activity");
      return rejectWithValue(error.response.data);
    }
  }
);
