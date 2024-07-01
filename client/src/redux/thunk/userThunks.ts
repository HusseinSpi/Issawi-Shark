import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const fetchUsersData = createAsyncThunk(
  "user/fetchUsersData",
  async () => {
    try {
      const response = await axios.get("users");
      const users = response.data;
      return users;
    } catch (error) {
      toast.error("Failed to fetch users data");
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    try {
      const response = await axios.get("users/me");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Failed to get current user");
      throw error;
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async ({
    userName,
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    photo,
  }: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    photo: string;
  }) => {
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password,
      passwordConfirm,
      photo,
    };
    try {
      const response = await axios.post("users/signup", data);
      toast.success("Signup successful!");
      window.location.reload();
      return response.data;
    } catch (error) {
      toast.error("Signup failed");
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    const data = { email, password };
    try {
      const response = await axios.post("users/login", data);
      toast.success("Login successful!");
      window.location.reload();
      return response.data;
    } catch (error) {
      toast.error("Login failed");
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.patch("users/updateMe", userData);
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
