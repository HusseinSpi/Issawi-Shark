import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const fetchUsersData = createAsyncThunk(
  "user/fetchUsersData",
  async () => {
    try {
      const response = await axios.get("/api/v1/users");
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch users data");
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
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/signup",
        data
      );
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
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        data
      );
      toast.success("Login successful!");
      window.location.reload();
      return response.data;
    } catch (error) {
      toast.error("Login failed");
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users/me");
      return response.data;
    } catch (error) {
      toast.error("Failed to get current user");
      throw error;
    }
  }
);
