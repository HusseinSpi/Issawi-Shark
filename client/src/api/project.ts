import axios from "axios";

axios.defaults.withCredentials = true;

const getAllProjects = async () => {
  const url = "projects";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
};

export default getAllProjects;
