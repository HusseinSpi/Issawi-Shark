import React, { useState } from "react";
import { User } from "../../types/User";

interface TeamMemberSearchProps {
  allUsers: User[];
  selectedUsers: User[];
  handleUserSelect: (user: User) => void;
  handleUserRemove: (user: User) => void;
}

const TeamMemberSearch: React.FC<TeamMemberSearchProps> = ({
  allUsers,
  selectedUsers,
  handleUserSelect,
  handleUserRemove,
}) => {
  const [emailSearch, setEmailSearch] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const handleEmailSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailSearch(value);
    if (value) {
      const filtered = allUsers.filter((user) => user.email.includes(value));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  return (
    <div className="mb-4 relative">
      <label
        htmlFor="teamMembers"
        className="block text-sm font-medium text-gray-700"
      >
        Team Members
      </label>
      <input
        type="text"
        id="teamMembers"
        name="teamMembers"
        className="h-10 p-3 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Search for team members"
        value={emailSearch}
        onChange={handleEmailSearchChange}
      />
      {filteredUsers.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleUserSelect(user)}
            >
              {user.email}
            </li>
          ))}
        </ul>
      )}

      {selectedUsers.length > 0 && (
        <div className="mb-4">
          <h4 className="block text-sm font-medium text-gray-700">
            Selected Team Members:
          </h4>
          <ul className="mt-1">
            {selectedUsers.map((user) => (
              <li
                key={user._id}
                className="flex items-center justify-between py-2 px-4 border border-gray-300 rounded-md shadow-sm mt-1"
              >
                <span>{user.email}</span>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleUserRemove(user)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamMemberSearch;
