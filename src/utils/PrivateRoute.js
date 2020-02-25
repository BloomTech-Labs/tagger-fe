import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import {
    getUserEmailAndId,
    getEmails,
    changeIsLoggedIn,
    updateEmails,
    incrementCounter
} from "../../actions";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to={`https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//mail.google.com/ profile https%3A//www.googleapis.com/auth/userinfo.email https%3A//www.googleapis.com/auth/user.emails.read&redirect_uri=${redirectUrl}&response_type=${response}&client_id=${client}`}
            />
        )} />
    );
};



// convert component to use redux
// pull in isLoggedIn from user reducer
// if not logged in redirect to `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//mail.google.com/ profile https%3A//www.googleapis.com/auth/userinfo.email https%3A//www.googleapis.com/auth/user.emails.read&redirect_uri=${redirectUrl}&response_type=${response}&client_id=${client}`


// in inbox.js write an if statement to check if it returns a valid token in the URL

