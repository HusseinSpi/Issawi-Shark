// ResetPassword.tsx
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { resetPassword } from "../../redux/thunk/userThunks";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface ResetPasswordData {
  resetToken: string;
  password: string;
  passwordConfirm: string;
}

const ResetPassword: FC = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { resetToken } = useParams<{ resetToken: string }>();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "passwordConfirm") {
      setPasswordConfirm(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetToken && password === passwordConfirm) {
      const resetData: ResetPasswordData = {
        resetToken,
        password,
        passwordConfirm,
      };
      dispatch(resetPassword(resetData));
    } else {
      alert("Passwords do not match or reset token is missing!");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Reset Password</p>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
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
                value={passwordConfirm}
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

          <button
            type="submit"
            className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
