import { FC } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar: FC = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-primaryColor text-white fade-in">
      <div className="container mx-auto flex justify-between items-center p-6">
        <img
          className="w-1/12"
          src="https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...GIqxJNmBnJwXs1M3EMoAJtlyIthPNq9PU5"
          alt="logo"
          onClick={() => navigate("/")}
        />
        <nav className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-thirdColor p-3 text-primaryColor rounded-lg"
                : "hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/general"
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-thirdColor p-3 text-primaryColor rounded-lg"
                : "hover:underline"
            }
          >
            Programs
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-thirdColor p-3 text-primaryColor rounded-lg"
                : "hover:underline"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive
                ? "font-bold bg-thirdColor p-3 text-primaryColor rounded-lg"
                : "hover:underline"
            }
          >
            About Us
          </NavLink>
          <button
            className="hover:bg-thirdColor bg-secondaryColor text-primaryColor py-2 px-4 rounded"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
