import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import projectReducer from "../features/projectSlice";
import navbarReducer from "../features/navbarSlice";
import commentReducer from "../features/commentSlice";
import recentActivityReducer from "../features/recentActivitySlice";

const store = configureStore({
  reducer: {
    recentActivity: recentActivityReducer,
    user: userReducer,
    navbar: navbarReducer,
    project: projectReducer,
    comment: commentReducer,
  },
});

export default store;
