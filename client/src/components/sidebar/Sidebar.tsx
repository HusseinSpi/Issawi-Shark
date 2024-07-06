import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FC, ReactNode } from "react";
import { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";

interface SidebarAndFooterProps {
  children: ReactNode;
}

const Sidebar: FC<SidebarAndFooterProps> = ({ children }) => {
  const dispatch = useDispatch();

  const currentUserState = useSelector((state: RootState) => state.navbar);

  const currentUser = currentUserState?.data?.data?.user;

  return (
    <div className="flex h-full">
      <div className="fixed top-0 left-0 h-full bg-primaryColor w-64 flex flex-col justify-between">
        <div className="py-6">
          <span className="ml-16 grid h-10 w-32 place-content-center rounded-lg bg-transparent">
            <img
              className="w-4/6"
              src="https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...GIqxJNmBnJwXs1M3EMoAJtlyIthPNq9PU5"
              alt="logo"
            />
          </span>
          <ul className="mt-10 space-y-1">
            <li>
              <NavLink
                to="/general"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ml-4 h-11 ${
                    isActive
                      ? "bg-secondaryColor text-primaryColor mr-0 rounded-r-none"
                      : "text-secondaryColor"
                  }`
                }
              >
                <FaHome className="text-xl" />
                General
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/teams"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ml-4 h-11 ${
                    isActive
                      ? "bg-secondaryColor text-primaryColor mr-0 rounded-r-none"
                      : "text-secondaryColor"
                  }`
                }
              >
                <IoPeople className="text-xl" />
                Teams
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/project"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ml-4 h-11 ${
                    isActive
                      ? "bg-secondaryColor text-primaryColor mr-0 rounded-r-none"
                      : "text-secondaryColor"
                  }`
                }
              >
                <AiOutlineFundProjectionScreen className="text-xl" />
                Project
              </NavLink>
            </li>
            {currentUser?.role === "admin" && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ml-4 h-11 ${
                      isActive
                        ? "bg-secondaryColor text-primaryColor mr-0 rounded-r-none"
                        : "text-secondaryColor"
                    }`
                  }
                >
                  <RiAdminLine className="text-xl" />
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="ml-64 flex-1 p-6 bg-secondaryColor">{children}</div>
    </div>
  );
};

export default Sidebar;
