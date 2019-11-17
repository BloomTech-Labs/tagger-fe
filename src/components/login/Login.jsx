import React from "react";
import GoogleButton from "react-google-button";

const Login = (props) => {

  return (
    <div className="d-flex align-content-center align-items-center w-100 h-100 text-center">
      <div className="mx-auto">
        <GoogleButton
          onClick={props.onSignIn}
        />
      </div>
    </div>
  );
}

export default Login;
