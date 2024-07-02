import React, { FC, useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/thunk/userThunks";

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Forgot Password</p>

          <div>
            <label htmlFor="email" className="sr-only">
              Enter Your Email
            </label>

            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                required
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <MdOutlineAlternateEmail />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            Send verification code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
