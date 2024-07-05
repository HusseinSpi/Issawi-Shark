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

  const reversedProjects = [...projects].reverse();

  return (
    <section className="pt-8 w-full px-4">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && (
        <p>Error: {error?.message || "An error occurred"}</p>
      )}
      {status === "succeeded" && reversedProjects.length > 0
        ? reversedProjects.map((project: Project, index: number) => (
            <div
              key={index}
              className="bg-thirdColor border border-gray-300 w-4/5 p-6 text-gray-800 rounded-lg shadow-md mb-11 transition-shadow duration-300 ease-in-out hover:shadow-2xl mx-auto"
              style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <div className="flex items-center mb-8 pb-4 border-b-2">
                <img
                  src={project.owner.photo}
                  alt={`${project.owner.userName}'s profile`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <p className="font-semibold">{project.owner.userName}</p>
              </div>
              <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
              <p className="mb-4">{project.description.substring(0, 300)}</p>
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
        : status === "succeeded" && <p>No projects available</p>}
    </section>
  );
};

export default ProjectDev;
