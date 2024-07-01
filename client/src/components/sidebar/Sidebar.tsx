import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdOutlineMessage } from "react-icons/md";
import { FC, ReactNode } from "react";

interface SidebarAndFooterProps {
  children: ReactNode;
}

const Sidebar: FC<SidebarAndFooterProps> = ({ children }) => {
  return (
    <div className="flex h-full">
      <div className="fixed top-0 left-0 h-full bg-secondaryColor w-64 flex flex-col justify-between">
        <div className="py-6">
          <span className="ml-5 grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-primaryColor">
            <img
              className="w-4/6"
              src="https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...GIqBNNmRnJwXs1M3EMoAJtlyEkg...pj8fgy"
              alt="logo"
            />
          </span>

          <ul className="mt-6 space-y-1">
            <li>
              <NavLink
                to="/general"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ml-4 h-11 ${
                    isActive
                      ? "bg-lightGray text-primaryColor mr-0 rounded-r-none"
                      : "text-white"
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
                      ? "bg-lightGray text-primaryColor mr-0 rounded-r-none"
                      : "text-white"
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
                      ? "bg-lightGray text-primaryColor mr-0 rounded-r-none"
                      : "text-white"
                  }`
                }
              >
                <AiOutlineFundProjectionScreen className="text-xl" />
                Project
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/message"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ml-4 h-11 ${
                    isActive
                      ? "bg-lightGray text-primaryColor mr-0 rounded-r-none"
                      : "text-white"
                  }`
                }
              >
                <MdOutlineMessage className="text-xl" />
                Message
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ml-4 h-11 ${
                    isActive
                      ? "bg-lightGray text-primaryColor mr-0 rounded-r-none"
                      : "text-white"
                  }`
                }
              >
                <FaHome className="text-xl" />
                Account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="ml-64 flex-1 p-6 bg-lightGray">{children}</div>
    </div>
  );
};

export default Sidebar;
