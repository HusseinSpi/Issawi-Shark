import { FC, ChangeEvent } from "react";
import { FaRegSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { User } from "../../types/User";
import {
  FaGithubAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

interface MyAccountProfileProps {
  userDetails: User;
  setUserDetails: (user: User) => void;
  editMode: { [key: string]: boolean };
  setEditMode: (editMode: { [key: string]: boolean }) => void;
  handleSave: (field: keyof User) => Promise<void>;
}

const MyAccountProfile: FC<MyAccountProfileProps> = ({
  userDetails,
  setUserDetails,
  editMode,
  setEditMode,
  handleSave,
}) => {
  const handleEditClick = (field: keyof User) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleUploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails({ ...userDetails, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full md:w-1/4 mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="text-center mb-4">
          <img
            src={userDetails?.photo || "/path/to/default/photo.jpg"}
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto"
          />
          {editMode.photo ? (
            <div className="mt-2">
              <input
                type="file"
                onChange={handleUploadPhoto}
                className="block text-lg border rounded px-2 mb-2"
              />
              <button
                className="ml-auto text-lg text-blue-600"
                onClick={() => handleSave("photo")}
              >
                <FaRegSave />
              </button>
            </div>
          ) : (
            <button
              className="mt-2 text-blue-600 underline"
              onClick={() => handleEditClick("photo")}
            >
              Upload new profile picture
            </button>
          )}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-2">About Me</h3>
          {editMode.about ? (
            <div>
              <textarea
                name="about"
                value={userDetails?.about}
                onChange={handleInputChange}
                className="block text-lg border rounded px-2 mb-2 w-full"
              />
              <button
                className="text-blue-600"
                onClick={() => handleSave("about")}
              >
                <FaRegSave />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-gray-700">{userDetails?.about}</p>
              <button
                className="ml-2 text-blue-600 underline"
                onClick={() => handleEditClick("about")}
              >
                <MdEdit />
              </button>
            </div>
          )}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">To communicate</h3>
          <div className="flex flex-col space-y-4 items-center">
            {["github", "facebook", "twitter", "instagram", "linkedin"].map(
              (field) => (
                <div key={field} className="flex items-center space-x-2">
                  {editMode[field] ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        name={field}
                        value={userDetails[field]}
                        onChange={handleInputChange}
                        className="block text-lg border rounded px-2 mb-2 w-full"
                      />
                      <button
                        className="text-blue-600 ml-2"
                        onClick={() => handleSave(field as keyof User)}
                      >
                        <FaRegSave />
                      </button>
                    </div>
                  ) : (
                    <>
                      {userDetails[field] ? (
                        <a
                          href={userDetails[field]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-2xl"
                        >
                          {field === "github" && <FaGithubAlt />}
                          {field === "facebook" && <FaFacebookF />}
                          {field === "twitter" && <FaTwitter />}
                          {field === "instagram" && <FaInstagram />}
                          {field === "linkedin" && <FaLinkedinIn />}
                        </a>
                      ) : (
                        <span className="text-gray-500">Add {field} link</span>
                      )}
                      <button
                        className="ml-2 text-blue-600 underline"
                        onClick={() => handleEditClick(field as keyof User)}
                      >
                        <MdEdit />
                      </button>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountProfile;
