import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

interface ForgotPasswordPayload {
  email: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
  passwordConfirm: string;
}

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
      // console.log(response.data);
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
    age,
    github,
    about,
  }: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    photo: string;
    age: number;
    github: string;
    about: string;
  }) => {
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password,
      passwordConfirm,
      photo,
      age,
      github,
      about,
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

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }: ForgotPasswordPayload) => {
    const data = { email };
    console.log(data);
    try {
      const response = await axios.post("users/forgotPassword", data);
      toast.success("Password reset email sent");
      return response.data;
    } catch (error) {
      toast.error("Failed to send password reset email");
      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ resetToken, password, passwordConfirm }: ResetPasswordData) => {
    const data = { password, passwordConfirm };
    try {
      const response = await axios.patch(
        `users/resetPassword/${resetToken}`,
        data
      );
      toast.success("Password reset successful");
      return response.data;
    } catch (error) {
      toast.error("Failed to reset password");
      throw error;
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (
    passwords: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/user/updatePassword", {
        passwordCurrent: passwords.currentPassword,
        password: passwords.newPassword,
        passwordConfirm: passwords.newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
