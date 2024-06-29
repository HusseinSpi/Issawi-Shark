import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import { Footer } from "./Footer";

interface NavbarAndFooterProps {
  children: ReactNode;
}

const NavbarAndFooter: React.FC<NavbarAndFooterProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default NavbarAndFooter;
