import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../redux/thunk/projectThunks";
import { RootState } from "../../redux/store/store";

interface User {
  userName: string;
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

const ProjectDev: FC = () => {
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
    <section className="pt-16 border-t-2 border-gray-200">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && projects.length > 0 ? (
        projects.map((project: Project, index: number) => (
          <div
            key={index}
            className="bg-gray-800 w-3/4 mx-auto p-12 text-gray-100 rounded-lg shadow-lg mb-10"
          >
            <div className="flex justify-between mb-8">
              <h1 className="text-xl">{project.title}</h1>
              <h2>{project.user.userName}</h2>
            </div>
            <p>{project.description}</p>
            <div className="flex justify-between mt-10">
              <div className="flex gap-5">
                {project.categories.map((category, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-500 text-white px-3 py-1 rounded-full text-xs"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="border border-white p-2 rounded-lg text-white hover:bg-white hover:text-gray-800">
                  Github
                </button>
              </a>
              <p>{project.rating}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No projects available</p>
      )}
    </section>
  );
};

export default ProjectDev;
