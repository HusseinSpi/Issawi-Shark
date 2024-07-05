import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

interface ProjectProps {
  projectId: string;
}

export const getAllProjects = createAsyncThunk(
  "project/fetchProjects",
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
  async (projectData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("projects", projectData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Project created successfully");
      return response.data.data;
    } catch (error) {
      console.error("Error creating project:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProject = createAsyncThunk(
  "project/getProject",
  async (props: ProjectProps, { rejectWithValue }) => {
    try {
      const response = await axios.get(`projects/${props.projectId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (
    { projectId, updateData }: { projectId: string; updateData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`projects/${projectId}`, updateData);
      return response.data.data;
    } catch (error) {
      console.error("Error updating project:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
