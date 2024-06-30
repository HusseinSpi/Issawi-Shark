import { getUser } from "../../api/users";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";

const Project: React.FC = () => {
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return <div>Project:</div>;
};

export default Project;
