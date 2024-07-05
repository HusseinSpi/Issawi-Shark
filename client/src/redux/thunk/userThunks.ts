import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

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
      return response.data;
    } catch (error) {
      toast.error("Failed to get current user");
      throw error;
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`users/profile/${userId}`);
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
    { rejectWithValue }
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
  async (userData: any, { rejectWithValue }) => {
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
    console.log(resetToken);
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
    { currentPassword, password, newPassword }: UpdatePasswordArgs,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch("users/updateMyPassword", {
        passwordCurrent: currentPassword,
        password: password,
        passwordConfirm: newPassword,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
