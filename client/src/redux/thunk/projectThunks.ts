import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "../../axiosConfig";
import { toast } from "react-toastify";
import { createRecentActivity } from "./recentActivityThunks";

axios.defaults.withCredentials = true;

interface ProjectProps {
  projectId: string;
}

interface ProjectData {
  title: string;
  [key: string]: any;
}

interface UpdateData {
  [key: string]: any;
}

interface ProjectResponse {
  data: any;
}

export const getAllProjects = createAsyncThunk<
  ProjectData[],
  void,
  { rejectValue: any }
>("project/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ProjectResponse>("projects");
    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (err) {
    const error = err as AxiosError;
    console.error("Error fetching projects:", error);
    return rejectWithValue(error.response?.data);
  }
});

export const createProject = createAsyncThunk<
  ProjectData,
  FormData,
  { rejectValue: any }
>(
  "project/createProject",
  async (projectData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post<ProjectResponse>(
        "projects",
        projectData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Project created successfully");
      dispatch(
        createRecentActivity({
          type: "project",
          description: `Project created: ${projectData.get("title")}`,
        })
      );
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error creating project:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getProject = createAsyncThunk<
  ProjectData,
  ProjectProps,
  { rejectValue: any }
>(
  "project/getProject",
  async ({ projectId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get<ProjectResponse>(
        `projects/${projectId}`
      );
      dispatch(
        createRecentActivity({
          type: "project",
          description: `Fetched project: ${projectId}`,
        })
      );
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error fetching project:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateProject = createAsyncThunk<
  ProjectData,
  { projectId: string; updateData: UpdateData },
  { rejectValue: any }
>(
  "project/updateProject",
  async ({ projectId, updateData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.patch<ProjectResponse>(
        `projects/${projectId}`,
        updateData
      );
      dispatch(
        createRecentActivity({
          type: "project",
          description: `Updated project: ${projectId}`,
        })
      );
      return response.data.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error updating project:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProject = createAsyncThunk<
  void,
  string,
  { rejectValue: any }
>("project/deleteProject", async (projectId, { dispatch, rejectWithValue }) => {
  try {
    await axios.delete(`projects/${projectId}`);
    toast.success("Project deleted successfully");
    dispatch(
      createRecentActivity({
        type: "project",
        description: `Deleted project: ${projectId}`,
      })
    );
  } catch (err) {
    const error = err as AxiosError;
    console.error("Error deleting project:", error);
    return rejectWithValue(error.response?.data);
  }
});
