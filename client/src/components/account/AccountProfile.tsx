import { FC } from "react";
import { User } from "../../types/User";

interface AccountProfileProps {
  userDetails: User;
  onEditBio: () => void;
  onUploadPhoto: () => void;
}

const AccountProfile: FC<AccountProfileProps> = ({
  userDetails,
  onEditBio,
  onUploadPhoto,
}) => {
  return (
    <div className="w-1/4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="text-center mb-4">
          <img
            src={userDetails.photo || "/path/to/default/photo.jpg"}
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto"
          />
          <div className="mt-4 text-lg font-bold">
            {userDetails.firstName} {userDetails.lastName}
          </div>
          <button
            className="mt-2 text-blue-600 underline"
            onClick={onUploadPhoto}
          >
            Upload new profile picture
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">About Me</h3>
          <p className="text-gray-700">{userDetails.about}</p>
          <button className="mt-2 text-blue-600 underline" onClick={onEditBio}>
            Edit Bio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
