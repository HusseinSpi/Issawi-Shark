import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../redux/thunk/projectThunks";
import { fetchUsersData } from "../../redux/thunk/userThunks";
import { getCurrentUser } from "../../redux/thunk/navbarThunks";
import { RootState } from "../../redux/store";
import { User } from "../../types/User";

const AddProject: React.FC = () => {
  const dispatch = useDispatch();
  const {
    data: usersData,
    status: userStatus,
    error: userError,
  } = useSelector((state: RootState) => state.user);
  const {
    data: currentUserData,
    status: currentUserStatus,
    error: currentUserError,
  } = useSelector((state: RootState) => state.navbar);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(fetchUsersData());
  }, [dispatch]);

  const currentUser: User = currentUserData?.data.user || {
    _id: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    role: "",
    about: "",
    age: "",
    github: "",
    photo: "",
  };

  const [emailSearch, setEmailSearch] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [github, setGithub] = useState<string>("");
  const [technologies, setTechnologies] = useState<string>("");
  const [projectStatus, setProjectStatus] = useState<string>("pending");

  const allUsers: User[] = usersData?.data?.users || [];

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

  const handleUserSelect = (user: User) => {
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
    setEmailSearch("");
    setFilteredUsers([]);
  };

  const handleUserRemove = (user: User) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((selectedUser) => selectedUser._id !== user._id)
    );
  };

  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(",").map((tech) => tech.trim());
    setTechnologies(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newProject = {
      title: projectTitle,
      description,
      categories,
      github,
      technologies: technologies.split(",").map((tech) => tech.trim()), // convert to array
      status: projectStatus,
      owner: currentUser._id,
      teamMembers: selectedUsers.map((user) => user._id),
    };
    dispatch(createProject(newProject));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Project</h1>
      <form
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 p-3"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="h-40 p-3 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={100}
            maxLength={500}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <div className="mt-1">
            {["Hitech", "Banking", "Healthcare", "Educational"].map(
              (category) => (
                <div className="flex items-center mb-2" key={category}>
                  <input
                    type="checkbox"
                    id={category.toLowerCase()}
                    name="categories"
                    value={category}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onChange={() => handleCategoryChange(category)}
                    checked={categories.includes(category)}
                  />
                  <label
                    htmlFor={category.toLowerCase()}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {category}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="github"
            className="block text-sm font-medium text-gray-700"
          >
            GitHub Link
          </label>
          <input
            type="url"
            id="github"
            name="github"
            className="h-10 p-3 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            required
            pattern="https?://(www\.)?github\.com/\S+"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="technologies"
            className="block text-sm font-medium text-gray-700"
          >
            Technologies (comma separated)
          </label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            className="h-10 p-3 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            className="h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={projectStatus}
            onChange={(e) => setProjectStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

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
        </div>

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

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProject;
