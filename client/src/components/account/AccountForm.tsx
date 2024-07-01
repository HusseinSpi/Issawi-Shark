import { FC, ChangeEvent } from "react";
import { FaRegSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { User } from "../../types/User";

interface AccountFormProps {
  userDetails: User;
  setUserDetails: (user: User) => void;
  editMode: { [key: string]: boolean };
  setEditMode: (editMode: { [key: string]: boolean }) => void;
  handleSave: (field: keyof User) => Promise<void>;
}

const AccountForm: FC<AccountFormProps> = ({
  userDetails,
  setUserDetails,
  editMode,
  setEditMode,
  handleSave,
}) => {
  const handleEditClick = (field: keyof User) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
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

          <div className="flex justify-start">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Change Email
            </button>
          </div>
          <div className="flex justify-start">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Change Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
