import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";

const Footer = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <footer
      className={`${
        !isAuthenticated &&
        "position-absolute bottom-0 start-50 translate-middle-x"
      } container-xxl border-top pt-3 mt-3`}
    >
      <p className="text-center text-muted">&copy; 2022 mlska</p>
    </footer>
  );
};

export default Footer;
