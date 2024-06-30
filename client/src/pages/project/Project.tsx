import React, { useEffect, useState } from "react";
import getAllProjects from "../../api/project";

const Project: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      const data = await getAllProjects();
      if (data) {
        setUser(data);
        setStatus("succeeded");
      } else {
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
    </div>
  );
};

export default Project;
