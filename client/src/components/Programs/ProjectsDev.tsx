import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../redux/thunk/projectThunks";
import { RootState } from "../../redux/store/store";
import { Project } from "../../types/Project";
import { useNavigate } from "react-router-dom";

const ProjectDev: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: projects = [],
    status,
    error,
  } = useSelector((state: RootState) => state.project || {});

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <section className="pt-16 w-full px-4">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && projects.length > 0 ? (
        projects.map((project: Project, index: number) => (
          <div
            key={index}
            className="bg-white border border-gray-300 w-full p-6 text-gray-800 rounded-lg shadow-md mb-6"
            style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
            <p className="mb-4">{project.description}</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mb-4 block"
            >
              View on GitHub
            </a>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-1">Categories:</h2>
              <ul className="list-disc list-inside">
                {project.categories.map((category, i) => (
                  <li key={i}>{category}</li>
                ))}
              </ul>
            </div>
            <p className="font-semibold">Rating: {project.rating}</p>
          </div>
        ))
      ) : (
        <p>No projects available</p>
      )}
    </section>
  );
};

export default ProjectDev;
