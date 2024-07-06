import { FC } from "react";
import { User } from "../../types/User";
import {
  FaGithubAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

interface AccountProfileProps {
  userDetails: User;
}

const AccountProfile: FC<AccountProfileProps> = ({ userDetails }) => {
  return (
    <div className="w-1/4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="text-center mb-4">
          <img
            src={userDetails?.photo || "/path/to/default/photo.jpg"}
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto"
          />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-2">About Me</h3>
          <p className="text-gray-700">{userDetails?.about}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">To communicate</h3>
          <div className="flex justify-center space-x-4">
            {userDetails.github && (
              <a
                href={userDetails.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithubAlt className="text-2xl" />
              </a>
            )}
            {userDetails.facebook && (
              <a
                href={userDetails.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-2xl" />
              </a>
            )}
            {userDetails.twitter && (
              <a
                href={userDetails.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-2xl" />
              </a>
            )}
            {userDetails.instagram && (
              <a
                href={userDetails.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl" />
              </a>
            )}
            {userDetails.linkedin && (
              <a
                href={userDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="text-2xl" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
