import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../redux/thunk/projectThunks";
import { fetchUsersData } from "../../redux/thunk/userThunks";
import { getCurrentUser } from "../../redux/thunk/navbarThunks";
import { RootState } from "../../redux/store";
import { User } from "../../types/User";
import FormInput from "./FormInput";
import CheckboxGroup from "./CheckboxGroup";
import TeamMemberSearch from "./TeamMemberSearch";

const AddProject: React.FC = () => {
  const navigate = useNavigate();
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

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [github, setGithub] = useState<string>("");
  const [technologies, setTechnologies] = useState<string>("");
  const [projectStatus, setProjectStatus] = useState<string>("pending");
  const [images, setImages] = useState<File[]>([]);

  const allUsers: User[] = usersData?.data?.users || [];

  const handleUserSelect = (user: User) => {
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prevImages) => [...prevImages, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const prepareFormData = () => {
    const formData = new FormData();
    formData.append("title", projectTitle);
    formData.append("description", description);
    categories.forEach((category) => formData.append("categories", category));
    formData.append("github", github);
    technologies
      .split(",")
      .map((tech) => tech.trim())
      .forEach((tech) => formData.append("technologies", tech));
    formData.append("status", projectStatus);
    formData.append("owner", currentUser._id);
    selectedUsers.forEach((user) => formData.append("teamMembers", user._id));
    images.forEach((image) => formData.append("images", image));

    return formData;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = prepareFormData();

    try {
      await dispatch(createProject(formData));
      navigate("/project");
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Project</h1>
      <form
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <FormInput
          id="title"
          label="Project Title"
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          required
        />

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
          />
        </div>

        <CheckboxGroup
          categories={["Hitech", "Banking", "Healthcare", "Educational"]}
          selectedCategories={categories}
          handleCategoryChange={handleCategoryChange}
        />

        <FormInput
          id="github"
          label="GitHub Link"
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          required
          pattern="https?://(www\.)?github\.com/\S+"
        />

        <FormInput
          id="technologies"
          label="Technologies (comma separated)"
          type="text"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          required
        />

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

        <TeamMemberSearch
          allUsers={allUsers}
          selectedUsers={selectedUsers}
          handleUserSelect={handleUserSelect}
          handleUserRemove={handleUserRemove}
        />

        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`preview-${index}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>

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
