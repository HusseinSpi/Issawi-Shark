import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../redux/thunk/projectThunks";
import { getCurrentUser } from "../../redux/thunk/userThunks";
import { RootState } from "../../redux/store";
import ProgramsNavBar from "../../components/Programs/ProgramsNavBar";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/Project";

const MyProject: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getCurrentUser());
  }, [dispatch]);

  const userData = user.data?.data?.user;
  const projectData = projects.data;

  console.log(projectData);

  if (!userData || !projectData) {
    return <div>Loading...</div>;
  }

  const projectUser = projectData.filter(
    (project: Project) => project.owner._id === userData._id
  );

  return (
    <>
      <ProgramsNavBar />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center my-4">
          <h1 className="text-2xl font-bold">My Projects</h1>
          <button
            onClick={() => navigate("/add-project")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Project
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectUser.map((project: Project) => (
            <div
              key={project.title}
              className="bg-white p-6 rounded-lg shadow-lg break-words"
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <h2 className="text-xl font-semibold mb-2 truncate">
                {project.title}
              </h2>
              <p className="text-gray-700 mb-4 break-words">
                {project.description}
              </p>
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

export default MyProject;
