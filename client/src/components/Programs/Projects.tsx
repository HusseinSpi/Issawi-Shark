import { FC, useState, useEffect } from "react";
import { getAllProjects } from "../../api/project";

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

const Projects: FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getAllProjects();
        const projectsList: Project[] = projectsData.data;
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="pt-16 border-t-2 border-gray-200">
      {projects.map((project: Project, index) => (
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
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <button className="border border-white p-2 rounded-lg text-white hover:bg-white hover:text-gray-800">
                Github
              </button>
            </a>
            <p>{project.rating}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
