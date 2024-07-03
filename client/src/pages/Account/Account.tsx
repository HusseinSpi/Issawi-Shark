import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getCurrentUser, updateUser } from "../../redux/thunk/userThunks";
import AccountForm from "../../components/account/AccountForm";
import AccountProfile from "../../components/account/AccountProfile";

const Account: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    data: userData,
    status,
    error,
  } = useSelector((state: RootState) => state.navbar);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    age: false,
    github: false,
    about: false,
    photo: false,
  });

  const [userDetails, setUserDetails] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    role: "",
    age: "",
    github: "",
    about: "",
    photo: "",
  });

  useEffect(() => {
    if (userData?.data.user) {
      setUserDetails(userData.data.user);
    }
  }, [userData]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSave = async (field: keyof typeof userDetails) => {
    await dispatch(updateUser({ [field]: userDetails[field] }));
    setEditMode({ ...editMode, [field]: false });
    dispatch(getCurrentUser());
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <div className="text-2xl font-bold">My Account</div>
        <p className="text-gray-600">
          You can change your account settings here
        </p>
      </div>

      <div className="flex space-x-8">
        <AccountForm
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          editMode={editMode}
          setEditMode={setEditMode}
          handleSave={handleSave}
        />
        <AccountProfile
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          editMode={editMode}
          setEditMode={setEditMode}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default Account;
