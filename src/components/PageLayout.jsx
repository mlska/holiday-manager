import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        className="d-flex justify-content-between"
      >
        <a className="navbar-brand ms-4" href="/holiday-manager">
          Manager urlopów
        </a>
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </Navbar>
      {props.children}
    </>
  );
};
