import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/thunk/userThunks";
import { toast } from "react-toastify";
import { RootState } from "../../redux/store/store";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface FormData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  photo: string;
  age: number;
  github: string;
  about: string;
  role: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    photo: "",
    age: 18,
    github: "",
    about: "",
    role: "user",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpUser(formData))
      .unwrap()
      .then((response) => {
        toast.success("Signup successful!");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Failed to sign up");
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
      <p className="text-center text-lg font-medium text-thirdColor">
        Create your account
      </p>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="firstName" className="sr-only">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter first name"
            required
          />
        </div>

        <div className="w-1/2">
          <label htmlFor="lastName" className="sr-only">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter last name"
            required
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="userName" className="sr-only">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter user name"
            required
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="photo" className="sr-only">
            Photo
          </label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter photo URL"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>

        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
            required
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <MdOutlineAlternateEmail />
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            required
          />

          <span
            onClick={handleShowPassword}
            className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
          >
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="passwordConfirm" className="sr-only">
          Confirm Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="passwordConfirm"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Confirm password"
            required
          />

          <span
            onClick={handleShowPassword}
            className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
          >
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="age" className="sr-only">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter your age"
          min={18}
          max={99}
          required
        />
      </div>
      <div>
        <label htmlFor="github" className="sr-only">
          GitHub Profile
        </label>
        <input
          type="url"
          id="github"
          name="github"
          value={formData.github}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter GitHub profile URL"
          required
        />
      </div>
      <div className="flex space-x-4">
        <div>
          <label htmlFor="linkedin" className="sr-only">
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter LinkedIn profile URL (optional)"
          />
        </div>

        <div>
          <label htmlFor="twitter" className="sr-only">
            Twitter Profile
          </label>
          <input
            type="url"
            id="twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Twitter profile URL (optional)"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <div>
          <label htmlFor="facebook" className="sr-only">
            Facebook Profile
          </label>
          <input
            type="url"
            id="facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Facebook profile URL (optional)"
          />
        </div>
        <div>
          <label htmlFor="instagram" className="sr-only">
            Instagram Profile
          </label>
          <input
            type="url"
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Instagram profile URL (optional)"
          />
        </div>
      </div>

      <div>
        <label htmlFor="about" className="sr-only">
          About
        </label>
        <textarea
          id="about"
          name="about"
          value={formData.about}
          onChange={handleChange}
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Tell us about yourself"
        />
      </div>

      <button
        type="submit"
        className="block w-full rounded-lg bg-thirdColorO px-5 py-3 text-sm font-medium text-white"
      >
        Sign up
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?
        <a className="underline" href="/sign-in">
          {" "}
          Sign in
        </a>
      </p>
    </form>
  );
};

export default SignUpForm;
