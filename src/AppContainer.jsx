import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Main from "./components/main/Main";
import Login from "./components/login/Login";
import Authenticating from "./components/authenticating/Authenticating";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { 
  // signOut, 
  signIn, checkSignInStatus, sendAuth } from "./api/authentication";
import { mountScripts } from "./api/scripts";
import {
  SIGNED_OUT,
  // SIGNED_IN,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_IN_PROGRESS
} from "./constants";
const AppContainer = (props) => {
  const [signInStatus, setSignInStatus] = useState(SIGNED_OUT);
  const [googleUser, setGoogleUser] = useState(undefined);
  const [id_token, setId_Token] = useState(undefined);
  useEffect(() => {
    mountScripts().then(init);
  }, [])
  const init = () => {
    window.gapi.load("client:auth2", initClient);
  }
  const initClient = () => {
    checkSignInStatus()
    .then(onSignInSuccess)
    .catch(_ => {
      setSignInStatus(AUTH_FAIL)
    });
  }


  const onClick = () => {
    const googleAuthInstance = window.gapi.auth2.getAuthInstance();
    googleAuthInstance.grantOfflineAccess().then(res => onSignIn(res));
  }


  // const onSignout = () => {
  //   props.signOut();
  // }

  const onSignIn = (res) => {
    console.log(res.code);
    signIn().then(onSignInSuccess);
  }
  const onSignInSuccess = (googleUser) => {
    setSignInStatus(AUTH_SUCCESS);
    setGoogleUser(googleUser);
    sendAuth(id_token);
  }
  const renderView = () => {
    if (signInStatus === AUTH_SUCCESS) {
      return <Main googleUser={googleUser} />;
    } else if (signInStatus === AUTH_IN_PROGRESS) {
      return <Authenticating />;
    } else {
      return <Login onSignIn={onClick} />;
    }
  }
  return (
    <React.Fragment>
      {props.location.pathname === "/" ? (
        <Redirect to="/inbox" />
      ) : (
        renderView()
      )}
    </React.Fragment>
  );
}
export default withRouter(AppContainer);