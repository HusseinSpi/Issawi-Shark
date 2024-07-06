import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";
import { createRecentActivity } from "./recentActivityThunks";

axios.defaults.withCredentials = true;

interface ForgotPasswordPayload {
  email: string;
}

interface ResetPasswordData {
  resetToken: string;
  password: string;
  passwordConfirm: string;
}

interface UpdatePasswordArgs {
  currentPassword: string;
  password: string;
  newPassword: string;
}

export const fetchUsersData = createAsyncThunk(
  "user/fetchUsersData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("users");
      const users = response.data;
      return users;
    } catch (error) {
      toast.error("Failed to fetch users data");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("users/me");
      return response.data;
    } catch (error) {
      toast.error("Failed to get current user");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUser",
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`users/profile/${userId}`);
      dispatch(
        createRecentActivity({
          type: "user",
          description: `Fetched user: ${userId}`,
        })
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to get user");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (
    {
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
      facebook,
      twitter,
      linkedin,
      instagram,
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
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    },
    { dispatch, rejectWithValue }
  ) => {
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
      facebook,
      twitter,
      linkedin,
      instagram,
    };
    try {
      const response = await axios.post("users/signup", data);
      toast.success("Signup successful!");
      dispatch(
        createRecentActivity({
          type: "user",
          description: `User signed up: ${userName}`,
        })
      );
      return response.data;
    } catch (error: any) {
      toast.error("Signup failed");
      console.error("Signup error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    const data = { email, password };
    try {
      const response = await axios.post("users/login", data);
      toast.success("Login successful!");
      dispatch(
        createRecentActivity({
          type: "user",
          description: `User logged in: ${email}`,
        })
      );
      window.location.reload();
      return response.data;
    } catch (error) {
      toast.error("Login failed");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.patch("users/updateMe", userData);
      dispatch(
        createRecentActivity({
          type: "user",
          description: `User updated: ${userData.username}`,
        })
      );
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }: ForgotPasswordPayload, { dispatch, rejectWithValue }) => {
    const data = { email };
    try {
      const response = await axios.post("users/forgotPassword", data);
      toast.success("Password reset email sent");
      dispatch(
        createRecentActivity({
          type: "user",
          description: `Password reset email sent to: ${email}`,
        })
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to send password reset email");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    { resetToken, password, passwordConfirm }: ResetPasswordData,
    { dispatch, rejectWithValue }
  ) => {
    const data = { password, passwordConfirm };
    try {
      const response = await axios.patch(
        `users/resetPassword/${resetToken}`,
        data
      );
      toast.success("Password reset successful");
      dispatch(
        createRecentActivity({
          type: "user",
          description: `Password reset with token: ${resetToken}`,
        })
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to reset password");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (
    { currentPassword, password, newPassword }: UpdatePasswordArgs,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.patch("users/updateMyPassword", {
        passwordCurrent: currentPassword,
        password: password,
        passwordConfirm: newPassword,
      });
      dispatch(
        createRecentActivity({
          type: "user",
          description: `User password updated`,
        })
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
