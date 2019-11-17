import React from "react";
import GoogleButton from "react-google-button";

const Authenticating = () => {

  return (
    <div className="d-flex align-content-center align-items-center w-100 h-100 text-center">
      <div className="mx-auto">
        <GoogleButton
          label='Signing in...'
          disabled
        />
      </div>
    </div>
  );
}

export default Authenticating;
