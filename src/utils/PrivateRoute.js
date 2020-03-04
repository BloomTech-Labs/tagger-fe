import React, { useEffect } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import {
    getUserEmailAndId,
    // getEmails,
    changeIsLoggedIn,
    updateEmails,
    incrementCounter
} from "../actions";

const PrivateRoute = (props) => {
    const { component: Component, ...rest } = props;

    const redirectUrl = process.env.REACT_APP_REDIRECTURI
        ? process.env.REACT_APP_REDIRECTURI
        : "http://localhost:3000/inbox";
    const response = "token id_token";
    const nonce = (12313459114561232 * Date.now()) / 10000000;
    const client = "765722368782-j3bqp7gm072b0vd1lv97kgh2mnp37b7j.apps.googleusercontent.com";

    useEffect(() => {
        const url = props.history.location.hash;
        const token = extractAccessTokenFromUrl(url);
        const id_token = extractIdTokenFromUrl(url);
        sessionStorage.setItem("id_token", id_token);

        if (!props.isEmailAddressAndIdRetrieved) {
            // If user data not retrieved, retrieve email address and user_id from Auth token
            props.getUserEmailAndId(token).then((res) => {
                // console.log("GETUSERDATA RES: ", res);
                if (res) {
                    props.changeIsLoggedIn(true);
                } else if (!res) {
                    window.location.replace(
                        `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//mail.google.com/ profile https%3A//www.google.com/m8/feeds https%3A//www.googleapis.com/auth/userinfo.email https%3A//www.googleapis.com/auth/user.emails.read&redirect_uri=${redirectUrl}&response_type=${response}&nonce=${nonce}&client_id=${client}`
                    );
                }
            });
        } else if (!props.areEmailsRetrieved) {
            // Else if user data retrieved AND emails not retrieved, retrieve emails
            const user_email = props.emailAddress;
            // props.getEmails(user_email, token).then(res => {
            //   console.log("GETEMAILS RES: ", res);
            props
                .updateEmails(user_email, token)
                .then((res) => {
                    console.log("STREAMEMAILS RES: ", res);
                })
                .catch((err) => {
                    console.log(err);
                });
            // });
        }
        console.log("EMAILS: ", props.emails);
        if (props.areEmailsUpdated === false) {
            props.incrementCounter();
        }
    }, [props.isEmailAddressAndIdRetrieved]);

    function extractAccessTokenFromUrl(urlString) {
        // Parses OAuth access token from page URL
        const newSplit = urlString.split("");
        const tokenStartIndex = newSplit.findIndex((element) => element === "=");
        const tokenEndIndex = newSplit.findIndex((element) => element === "&");
        const token = newSplit
            .splice(tokenStartIndex + 1, tokenEndIndex - tokenStartIndex - 1)
            .join("");
        return token;
    }
    function extractIdTokenFromUrl(urlString) {
        const tokenStartIndex = urlString.indexOf("id_token=");
        const tokenEndIndex = urlString
            .substring(tokenStartIndex, urlString.length - 1)
            .indexOf("&");
        const id_token = urlString.substring(tokenStartIndex + 9, tokenStartIndex + tokenEndIndex);
        return id_token;
    }

    return <Route {...rest} render={(...renderProps) => <Component {...renderProps} />} />;
};

const mapStateToProps = ({ imap, user, contacts }) => ({
    emailAddress: user.emailAddress,
    isEmailAddressAndIdRetrieved: user.isEmailAddressAndIdRetrieved,
    areEmailsRetrieved: imap.areEmailsRetrieved,
    areEmailsUpdated: imap.areEmailsUpdated,
    counter: imap.streamCounter,
    isLoggedIn: user.isLoggedIn
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getUserEmailAndId,
            // getEmails,
            changeIsLoggedIn,
            updateEmails,
            incrementCounter
        },
        dispatch
    );

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(PrivateRoute);
