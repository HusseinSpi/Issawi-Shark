import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface CreateRecentActivityPayload {
  type: string;
  description: string;
}

export const getRecentActivity = createAsyncThunk<RecentActivity[]>(
  "activity/fetchRecentActivity",
  async () => {
    try {
      const response = await axios.get("recent-activities");
      return response.data;
    } catch (error: any) {
      toast.error("Failed to get recent activity");
      throw error;
    }
  }
);

export const createRecentActivity = createAsyncThunk<
  RecentActivity,
  CreateRecentActivityPayload
>(
  "activity/createRecentActivity",
  async (activityData, { rejectWithValue }) => {
    try {
      const response = await axios.post("recent-activities", activityData);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to create recent activity");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
