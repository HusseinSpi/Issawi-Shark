import { FC } from "react";
import { User } from "../../types/User";

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
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">About Me</h3>
          <p className="text-gray-700">{userDetails?.about}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
