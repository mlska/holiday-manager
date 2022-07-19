import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

function handleLogout(instance) {
  instance.logoutPopup().catch((e) => {
    console.error(e);
  });
}

export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <Button
      variant="btn btn-warning"
      className="ml-auto"
      onClick={() => handleLogout(instance)}
    >
      Wyloguj się
    </Button>
  );
};