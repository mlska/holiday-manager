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
      variant="btn btn-warning"
      className="ml-auto"
      onClick={() => handleLogout(instance)}
    >
      Wyloguj się
    </Button>
  );
};
