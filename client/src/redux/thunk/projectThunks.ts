import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";

axios.defaults.withCredentials = true;

export const getAllProjects = createAsyncThunk(
  "project/fetchProject",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("projects");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
