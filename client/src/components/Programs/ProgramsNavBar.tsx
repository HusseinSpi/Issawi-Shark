import { FaRegBell, FaSearch } from "react-icons/fa";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/thunk/navbarThunks";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  userName: string;
  email: string;
  role: string;
  photo: string;
}

const ProgramsNavBar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: userData,
    status,
    error,
  } = useSelector((state: RootState) => state.navbar);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const person: User = userData?.data.user || {
    _id: "",
    userName: "",
    email: "",
    role: "",
    photo: "",
  };

  return (
    <div className="flex justify-between items-center p-4 bg-thirdColor shadow-md">
      <div className="flex items-center">
        <div className="flex items-center border rounded-xl px-2 py-1 w-96 h-11 bg-white shadow-sm">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div
        className="flex items-center gap-5 cursor-pointer"
        onClick={() => navigate(`/profile/${person._id}`)}
      >
        <span className="text-gray-700">{person.email}</span>
        <img
          src={
            person.photo ||
            "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          }
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProgramsNavBar;
