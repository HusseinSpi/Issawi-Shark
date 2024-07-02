import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../redux/thunk/projectThunks";
import { RootState } from "../../redux/store";
import { Project } from "../../types";

const ProjectDisplay: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch();

  const projectData = useSelector((state: RootState) =>
    state.project.data.find((project) => project.id === projectId)
  );

  useEffect(() => {
    if (projectId) {
      dispatch(getProject({ projectId }));
    }
  }, [dispatch, projectId]);

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

  console.log(owner);
  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 break-words">{title}</h1>
      <p className="text-gray-700 mb-6 break-words">{description}</p>

      <div className="mb-6">
        {categories.map((category) => (
          <span
            key={category}
            className="inline-block bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
          >
            {category}
          </span>
        ))}
      </div>

      <a
        href={github}
        className="text-blue-500 hover:underline mb-6 block break-words"
      >
        View on GitHub
      </a>

      <div className="flex items-center mb-6 break-words">
        <span className="text-yellow-500 mr-4">{rating} ★</span>
        <span className="text-gray-600">{date}</span>
      </div>

      <div className="mb-6 break-words">
        <h2 className="text-xl font-semibold mb-2">Project Details</h2>
        <p className="text-gray-700">
          <strong>Status:</strong> {status}
        </p>
        <p className="text-gray-700">
          <strong>Technologies:</strong> {technologies.join(", ")}
        </p>
        <p className="text-gray-700">
          <strong>Team Members:</strong>{" "}
          {teamMembers.map((member) => member.userName).join(", ")}
        </p>
      </div>

      <div className="flex items-center">
        <img
          src={owner.photo}
          alt="User"
          className="w-16 h-16 rounded-full mr-6"
        />
        <div>
          <p className="text-gray-800 font-bold">{owner.userName}</p>
          <p className="text-gray-600">{owner.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplay;
