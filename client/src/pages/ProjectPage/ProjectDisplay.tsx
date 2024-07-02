import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Comments from "../../components/myProject/Comments";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  categories: string[];
  github: string;
  rating: number;
  date: string;
  status: string;
  technologies: string[];
  teamMembers: { userName: string }[];
  owner: { photo: string; userName: string; email: string };
}

const ProjectDisplay: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const projectData: ProjectData | undefined = useSelector((state: RootState) =>
    state.project.data.find((project) => project.id === projectId)
  );

  if (!projectData) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    categories,
    github,
    rating,
    date,
    status,
    technologies,
    teamMembers,
    owner,
  } = projectData;

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-10 px-32 rounded-lg shadow-lg w-full max-w-6xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-4 break-words">{title}</h1>
        <p className="text-gray-100 mb-6 break-words whitespace-pre-line">
          {description}
        </p>

        <div className="mb-6">
          {categories.map((category) => (
            <span
              key={category}
              className="inline-block bg-indigo-300 text-indigo-900 text-sm px-3 py-1 rounded-full mr-2 mb-2"
            >
              {category}
            </span>
          ))}
        </div>

        <a
          href={github}
          className="text-indigo-200 hover:underline mb-6 block break-words"
        >
          View on GitHub
        </a>

        <div className="flex items-center mb-6 break-words">
          <span className="text-yellow-300 mr-4">{rating} ★</span>
          <span className="text-gray-200">{date}</span>
        </div>

        <div className="mb-6 break-words">
          <h2 className="text-xl font-semibold mb-2">Project Details</h2>
          <p className="text-gray-100">
            <strong>Status:</strong> {status}
          </p>
          <p className="text-gray-100">
            <strong>Technologies:</strong> {technologies.join(", ")}
          </p>
          <p className="text-gray-100">
            <strong>Team Members:</strong>{" "}
            {teamMembers.map((member) => member.userName).join(", ")}
          </p>
        </div>

        <div className="flex items-center">
          <img
            src={owner.photo}
            alt="User"
            className="w-16 h-16 rounded-full mr-6 border-4 border-white"
          />
          <div>
            <p className="text-gray-100 font-bold">{owner.userName}</p>
            <p className="text-gray-300">{owner.email}</p>
          </div>
        </div>
      </div>
      <Comments projectId={projectData.id} />
    </>
  );
};

export default ProjectDisplay;
