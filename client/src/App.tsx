import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarAndFooter from "./components/NavbarAndFooter/NavbarAndFooter";
import HomePage from "./pages/HomePage/HomePage";
import { NoMatch } from "./pages/noMatch/NoMatch";
import { SignUpPage } from "./pages/Signup/Login/Signup";
import { SignInPage } from "./pages/Signup/Login/Login";
import Programs from "./pages/Programs/Programs";
import Sidebar from "./components/sidebar/Sidebar";
import Account from "./pages/Account/Account";
import Teams from "./pages/Teams/Teams";
import Project from "./pages/project/Project";
import Message from "./pages/message/Message";
import useCookie from "./hooks/useCookie";

const App: React.FC = () => {
  const userToken = useCookie("userToken");

  console.log(userToken);

  const routes = [
    {
      path: "/",
      element: (
        <NavbarAndFooter>
          <HomePage />
        </NavbarAndFooter>
      ),
    },
    {
      path: "sign-up",
      element: (
        <NavbarAndFooter>
          <SignUpPage />
        </NavbarAndFooter>
      ),
    },
    {
      path: "sign-in",
      element: (
        <NavbarAndFooter>
          <SignInPage />
        </NavbarAndFooter>
      ),
    },
    {
      path: "programs",
      element: (
        <Sidebar>
          <Programs />
        </Sidebar>
      ),
    },
    {
      path: "teams",
      element: (
        <Sidebar>
          <Teams />
        </Sidebar>
      ),
    },
    {
      path: "project",
      element: (
        <Sidebar>
          <Project />
        </Sidebar>
      ),
    },
    {
      path: "message",
      element: (
        <Sidebar>
          <Message />
        </Sidebar>
      ),
    },
    {
      path: "account",
      element: (
        <Sidebar>
          <Account />
        </Sidebar>
      ),
    },
    {
      path: "*",
      element: (
        <NavbarAndFooter>
          <NoMatch />
        </NavbarAndFooter>
      ),
    },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
