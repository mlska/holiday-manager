import React from "react";

const WelcomeContent = () => {
  return (
    <>
      <div className="my-4 text-center">
        <h1 className="fw-bold">Witaj w aplikacji do zarządzania urlopami</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Zaloguj się, aby wyświetlić listę urlopów</p>
        </div>
      </div>
    </>
  );
};

export default WelcomeContent;
