import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import projectReducer from "../features/projectSlice";
import navbarReducer from "../features/navbarSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
    project: projectReducer,
  },
});

export default store;
