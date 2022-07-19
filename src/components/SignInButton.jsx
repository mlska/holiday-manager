import React, { useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = useCallback((instance) => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  }, []);

  return (
    <Button
      variant="btn btn-success"
      className="ml-auto"
      onClick={() => handleLogin(instance)}
    >
      Zaloguj się
    </Button>
  );
};
