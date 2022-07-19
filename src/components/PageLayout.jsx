import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <a className="navbar-brand" href="/">
          Manager urlopów
        </a>
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </Navbar>
      {props.children}
    </>
  );
};
