import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const getCurrentUser = createAsyncThunk(
  "navbarSlice/getCurrentUser",
  async () => {
    try {
      const response = await axios.get("users/me");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Failed to get current user");
      throw error;
    }
  }
);
