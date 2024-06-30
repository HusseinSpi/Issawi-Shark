import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/thunk/userThunks";
import { toast } from "react-toastify";
import { RootState } from "../../redux/store/store";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    photo: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpUser(formData))
      .unwrap()
      .then((response) => {
        toast.success("Signup successful!");
        // Handle successful signup
      })
      .catch((error) => {
        toast.error("Failed to sign up");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="passwordConfirm"
        value={formData.passwordConfirm}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="photo"
        value={formData.photo}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
