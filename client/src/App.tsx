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
import General from "./pages/General/General";
import Sidebar from "./components/sidebar/Sidebar";
import Account from "./pages/Account/Account";
import Teams from "./pages/Teams/Teams";
import MyProject from "./pages/MyProject/MyProject";
import Message from "./pages/message/Message";
import { SignUpPage } from "./pages/Signup/Signup";
import { SignInPage } from "./pages/Login/Login";
import ProjectPage from "./pages/ProjectPage/ProjectPage";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const userToken = Cookies.get("jwt");
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const PrivateRouteOne = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? <Navigate to="/general" /> : children;
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
      path: "general",
      element: (
        <PrivateRouteTwo>
          <Sidebar>
            <General />
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
            <MyProject />
          </Sidebar>
        </PrivateRouteTwo>
      ),
    },
    {
      path: "project/:projectId",
      element: (
        <PrivateRouteTwo>
          <Sidebar>
            <ProjectPage />
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
