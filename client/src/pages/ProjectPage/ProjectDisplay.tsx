import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Comments from "../../components/myProject/Comments";
import ProgramsNavBar from "../../components/Programs/ProgramsNavBar";
import {
  FaGithubAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

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
  owner: {
    _id: string;
    photo: string;
    userName: string;
    email: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  images: string[];
}

const ProjectDisplay: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const projectData: ProjectData | undefined = useSelector(
    (state: RootState) => {
      if (Array.isArray(state.project.data)) {
        return state.project.data.find((project) => project.id === projectId);
      }
      return undefined;
    }
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
    technologies,
    teamMembers,
    owner,
    images,
  } = projectData;

  return (
    <>
      <ProgramsNavBar />
      <div className="mt-11">
        <div className="bg-thirdColor p-10 px-32 rounded-lg shadow-lg w-full max-w-6xl mx-auto text-primaryColor">
          <h1 className="text-4xl font-bold mb-4 break-words">{title}</h1>
          <p className="text-primaryColor mb-6 break-words whitespace-pre-line">
            {description}
          </p>

          <div className="mb-6">
            {categories.map((category) => (
              <span
                key={category}
                className="inline-block bg-indigo-300 text-primaryColor text-sm px-3 py-1 rounded-full mr-2 mb-2"
              >
                {category}
              </span>
            ))}
          </div>

          <a
            href={github}
            className="text-primaryColor hover:underline mb-6 block break-words"
          >
            View on GitHub
          </a>

          <div className="mb-6 break-words">
            <h2 className="text-xl font-semibold mb-2">Project Details</h2>
            {technologies.length > 0 && (
              <p className="text-primaryColor">
                <strong>Technologies:</strong> {technologies.join(", ")}
              </p>
            )}

            {teamMembers.length > 0 && (
              <p className="text-primaryColor">
                <strong>Team Members:</strong>{" "}
                {teamMembers.map((member) => member.userName).join(", ")}
              </p>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Project Images</h2>
            <div>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:8000${image}`}
                  alt={`Project Image ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center mb-6 break-words">
            <span className="text-yellow-300 mr-4">{rating} ★</span>
            <span className="text-primaryColor">{date}</span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">To communicate</h2>
            <div className="flex flex-col gap-2">
              {owner.linkedin && (
                <p className="flex items-center gap-2">
                  Linkedin :{" "}
                  <a
                    href={owner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn />
                  </a>
                </p>
              )}
              {owner.github && (
                <p className="flex items-center gap-2">
                  Github :{" "}
                  <a
                    href={owner.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithubAlt />
                  </a>
                </p>
              )}
              {owner.twitter && (
                <p className="flex items-center gap-2">
                  Twitter :{" "}
                  <a
                    href={owner.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                </p>
              )}
              {owner.instagram && (
                <p className="flex items-center gap-2">
                  Instagram :{" "}
                  <a
                    href={owner.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                </p>
              )}
              {owner.facebook && (
                <p className="flex items-center gap-2">
                  Facebook :{" "}
                  <a
                    href={owner.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                  </a>
                </p>
              )}
            </div>
          </div>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate(`/profile/${owner._id}`)}
          >
            <img
              src={owner.photo}
              alt="User"
              className="w-16 h-16 rounded-full mr-6 border-4 border-white"
            />
            <div>
              <p className="text-primaryColor font-bold">{owner.userName}</p>
              <p className="text-primaryColor">{owner.email}</p>
            </div>
          </div>
        </div>
        <Comments projectId={projectData.id} />
      </div>
    </>
  );
};

export default ProjectDisplay;
