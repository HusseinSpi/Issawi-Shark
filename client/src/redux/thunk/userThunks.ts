import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await axios.get("http://localhost:8000/api/v1/users");
    return response.data;
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
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/signup",
      data
    );
    toast.success("Signup successful!");
    window.location.reload();
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    const data = { email, password };
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      data
    );
    toast.success("Login successful!");
    window.location.reload();
    return response.data;
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const response = await axios.get("http://localhost:8000/api/v1/users/me");
    return response.data;
  }
);
