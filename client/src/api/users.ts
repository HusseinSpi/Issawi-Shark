import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const userData = async () => {
  const url = "http://localhost:8000/api/v1/users";

  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const signUp = async (
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordConfirm: string,
  photo: string
) => {
  const url = "http://localhost:8000/api/v1/users/signup";
  const data = {
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
    photo: photo,
  };

  try {
    const response = await axios.post(url, data);
    console.log("Signup successful:", response.data);
    toast.success("Signup successful!");
    window.location.reload();
    return response.data;
  } catch (error: unknown) {
    toast.error("Failed to sign up");
  }
};

export const login = async (
  email: string,
  password: string
): Promise<unknown> => {
  const url = "http://localhost:8000/api/v1/users/login";
  const data = { email, password };
  try {
    const response = await axios.post(url, data);
    toast.success("Login successful!");
    window.location.reload();
    return response.data;
  } catch (error: unknown) {
    toast.error("Failed to login");
    throw error;
  }
};
