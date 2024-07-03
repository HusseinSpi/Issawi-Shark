import { FC, useState, ChangeEvent } from "react";
import { FaRegSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { User } from "../../types/User";

interface AccountProfileProps {
  userDetails: User;
  setUserDetails: (user: User) => void;
  editMode: { [key: string]: boolean };
  setEditMode: (editMode: { [key: string]: boolean }) => void;
  handleSave: (field: keyof User) => Promise<void>;
}

const AccountProfile: FC<AccountProfileProps> = ({
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
    <div className="w-1/4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="text-center mb-4">
          <img
            src={userDetails?.photo || "/path/to/default/photo.jpg"}
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto"
          />
          {editMode.photo ? (
            <input
              type="file"
              onChange={handleUploadPhoto}
              className="block text-lg border rounded px-2 mb-2"
            />
          ) : (
            <button
              className="mt-2 text-blue-600 underline"
              onClick={() => handleEditClick("photo")}
            >
              Upload new profile picture
            </button>
          )}
          {editMode.photo && (
            <button
              className="ml-auto text-lg"
              onClick={() => handleSave("photo")}
            >
              <FaRegSave />
            </button>
          )}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">About Me</h3>
          {editMode.about ? (
            <textarea
              name="about"
              value={userDetails?.about}
              onChange={handleInputChange}
              className="block text-lg border rounded px-2 mb-2"
            />
          ) : (
            <p className="text-gray-700">{userDetails?.about}</p>
          )}
          <button
            className="mt-2 text-blue-600 underline"
            onClick={() =>
              editMode.about ? handleSave("about") : handleEditClick("about")
            }
          >
            {editMode.about ? <FaRegSave /> : <MdEdit />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
