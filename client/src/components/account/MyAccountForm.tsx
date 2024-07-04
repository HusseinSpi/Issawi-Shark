import { FC, useState, ChangeEvent } from "react";
import { FaRegSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Cookies from "js-cookie";
import { User } from "../../types/User";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../redux/thunk/userThunks";
import { AppDispatch } from "../../redux/store/store";

interface MyAccountFormProps {
  userDetails: User;
  setUserDetails: (user: User) => void;
  editMode: { [key: string]: boolean };
  setEditMode: (editMode: { [key: string]: boolean }) => void;
  handleSave: (field: keyof User) => Promise<void>;
}

const MyAccountForm: FC<MyAccountFormProps> = ({
  userDetails,
  setUserDetails,
  editMode,
  setEditMode,
  handleSave,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditClick = (field: keyof User) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleLogOut = () => {
    Cookies.remove("jwt");
    window.location.reload();
  };

  const handlePasswordSave = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        updatePassword({
          currentPassword,
          password,
          newPassword: confirmPassword,
        })
      ).unwrap();
      setChangePassword(false);
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="w-3/4 bg-white shadow-md rounded-lg p-6 mb-8">
      <form>
        <div className="grid grid-cols-1 gap-6 mb-4">
          <div className="flex flex-col mb-4">
            <label className="block text-gray-600 mb-2">Email Address</label>
            <span className="block text-primaryColor text-lg">
              {userDetails.email}
            </span>
          </div>

          {[
            {
              label: "UserName",
              field: "userName",
              value: userDetails.userName,
            },
            {
              label: "First Name",
              field: "firstName",
              value: userDetails.firstName,
            },
            {
              label: "Last Name",
              field: "lastName",
              value: userDetails.lastName,
            },
            { label: "Age", field: "age", value: userDetails.age },
            { label: "Github", field: "github", value: userDetails.github },
          ].map(({ label, field, value }) => (
            <div key={field} className="flex flex-col mb-4">
              <label className="block text-gray-600 mb-2">{label}</label>
              {editMode[field] ? (
                <input
                  type="text"
                  name={field}
                  value={value}
                  onChange={handleInputChange}
                  className="block text-lg border rounded px-2 mb-2"
                />
              ) : (
                <span className="block text-primaryColor text-lg mb-2">
                  {value}
                </span>
              )}
              <button
                type="button"
                onClick={() =>
                  editMode[field]
                    ? handleSave(field as keyof User)
                    : handleEditClick(field as keyof User)
                }
                className="ml-auto text-lg"
              >
                {editMode[field] ? <FaRegSave /> : <MdEdit />}
              </button>
            </div>
          ))}

          <div className="flex flex-col items-start">
            {changePassword ? (
              <div className="flex flex-col w-full">
                <div className="flex flex-col mb-4">
                  <label className="block text-gray-600 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="block text-lg border rounded px-2 mb-2"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="block text-gray-600 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block text-lg border rounded px-2 mb-2"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="block text-gray-600 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block text-lg border rounded px-2 mb-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={handlePasswordSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save Password
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setChangePassword(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
              >
                Change Password
              </button>
            )}
            <button
              type="button"
              onClick={handleLogOut}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              LogOut
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyAccountForm;
