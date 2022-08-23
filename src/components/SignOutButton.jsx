import React, { useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = useCallback((instance) => {
    instance.logoutPopup().catch((e) => {
      console.error(e);
    });
  }, []);

  return (
    <Button
      variant="btn btn-warning btn-md px-4 me-4"
      className="ml-auto"
      onClick={() => handleLogout(instance)}
    >
      Wyloguj się
    </Button>
  );
};
