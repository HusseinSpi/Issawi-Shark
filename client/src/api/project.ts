import axios from "axios";

axios.defaults.withCredentials = true;

export const getAllProjects = async () => {
  const url = "http://localhost:8000/api/v1/projects";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
};
