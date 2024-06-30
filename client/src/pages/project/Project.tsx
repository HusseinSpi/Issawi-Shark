import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/thunk/userThunks";
import { RootState } from "../../redux/store/store";

const Project: React.FC = () => {
  const dispatch = useDispatch();
  const {
    data: user,
    status,
    error,
  } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div>
      Project:
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && user && <p>{user.userName}</p>}
    </div>
  );
};

export default Project;
