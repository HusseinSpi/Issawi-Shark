import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../redux/thunk/projectThunks";
import { getCurrentUser } from "../../redux/thunk/userThunks";
import { RootState } from "../../redux/store";
import ProgramsNavBar from "../../components/Programs/ProgramsNavBar";

interface User {
  _id: string;
  userName: string;
  email: string;
  role: string;
  photo: string;
}

interface Project {
  title: string;
  description: string;
  github: string;
  user: User;
  categories: string[];
  rating: number;
}

const Programs: React.FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getCurrentUser());
  }, [dispatch]);

  // Ensure data is available before accessing it
  const userData = user.data?.data?.user;
  const projectData = projects.data;

  if (!userData || !projectData) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  const projectUser = projectData.filter(
    (project: Project) => project.user._id === userData._id
  );

  return (
    <>
      <ProgramsNavBar />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectUser.map((project: Project) => (
            <div
              key={project.title}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <a
                href={project.github}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              <div className="mt-4">
                <h3 className="text-md font-medium">Categories:</h3>
                <ul className="list-disc list-inside">
                  {project.categories.map((category, index) => (
                    <li key={index} className="text-gray-600">
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <span className="text-md font-medium">Rating:</span>{" "}
                {project.rating}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Programs;
