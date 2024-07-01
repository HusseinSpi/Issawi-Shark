import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../redux/thunk/projectThunks";
import ProjectDev from "../../components/Programs/ProjectsDev";

interface User {
  userName: string;
  role: string;
  photo: string;
}

const Project: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const data = await getAllProjects();
        if (data) {
          setUser(data);
          setStatus("succeeded");
        } else {
          setStatus("failed");
          setError("Failed to fetch projects");
        }
      } catch (err) {
        setStatus("failed");
        setError("Failed to fetch projects");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      Project:
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && user && <p>{user.userName}</p>}
      <ProjectDev />
    </div>
  );
};

export default Project;
