import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

interface ProjectProps {
  projectId: string;
}

export const getAllProjects = createAsyncThunk(
  "project/fetchProject",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("projects");
      return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axios.post("projects", projectData);
      toast.success("Project created successfully");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProject = createAsyncThunk(
  "project/getUser",
  async (props: ProjectProps, { rejectWithValue }) => {
    try {
      const response = await axios.get(`users/${props.projectId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`projects/${projectId}/rating`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
