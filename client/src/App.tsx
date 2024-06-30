import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import NavbarAndFooter from "./components/NavbarAndFooter/NavbarAndFooter";
import HomePage from "./pages/HomePage/HomePage";
import { NoMatch } from "./pages/noMatch/NoMatch";
import Programs from "./pages/Programs/Programs";
import Sidebar from "./components/sidebar/Sidebar";
import Account from "./pages/Account/Account";
import Teams from "./pages/Teams/Teams";
import Project from "./pages/project/Project";
import Message from "./pages/message/Message";
import { SignUpPage } from "./pages/Signup/Signup";
import { SignInPage } from "./pages/Login/Login";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const userToken = Cookies.get("jwt");
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const PrivateRouteOne = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? <Navigate to="/programs" /> : children;
  };

  const PrivateRouteTwo = ({ children }: { children: JSX.Element }) => {
    return !isAuthenticated ? <Navigate to="/sign-in" /> : children;
  };

  const routes = [
    {
      path: "/",
      element: (
        <PrivateRouteOne>
          <NavbarAndFooter>
            <HomePage />
          </NavbarAndFooter>
        </PrivateRouteOne>
      ),
    },
    {
      path: "sign-up",
      element: (
        <PrivateRouteOne>
          <NavbarAndFooter>
            <SignUpPage />
          </NavbarAndFooter>
        </PrivateRouteOne>
      ),
    },
    {
      path: "sign-in",
      element: (
        <PrivateRouteOne>
          <NavbarAndFooter>
            <SignInPage />
          </NavbarAndFooter>
        </PrivateRouteOne>
      ),
    },
    {
      path: "programs",
      element: (
        <PrivateRouteTwo>
          <Sidebar>
            <Programs />
          </Sidebar>
        </PrivateRouteTwo>
      ),
    },
    {
      path: "teams",
      element: (
        <PrivateRouteTwo>
          <Sidebar>
            <Teams />
          </Sidebar>
        </PrivateRouteTwo>
      ),
    },
    {
      path: "project",
      element: (
        <PrivateRouteTwo>
          <Sidebar>
            <Project />
          </Sidebar>
        </PrivateRouteTwo>
      ),
    },
    {
      path: "message",
      element: (
        <PrivateRouteTwo>
          <Sidebar>
            <Message />
          </Sidebar>
        </PrivateRouteTwo>
      ),
    },
    {
      path: "account",
      element: (
        <PrivateRouteTwo>
          <Sidebar>
            <Account />
          </Sidebar>
        </PrivateRouteTwo>
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
