import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
// import "jest-dom/extend-expect";
// import '@testing-library/jest-dom/extend-expect';

import Main from "./components/login/Login";
import Authenticating from "./components/authenticating/Authenticating";
import LandingPage from "./components/landing_page/LandingPage";
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
  
  afterEach(cleanup);

