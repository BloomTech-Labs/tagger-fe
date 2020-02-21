import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import Emails from "./Emails";
import { getUserEmailAndId, getEmails, changeIsLoggedIn } from "../../actions";
import Sidebar from "./Sidebar";
import Swal from 'sweetalert2';

const S = {
  Container: styled.div`
    display: flex;
    height: calc(100vh - 64px);
  `,
};

const Inbox = props => {
  useEffect(() => {
    const url = props.history.location.hash;
    const token = extractTokenFromUrl(url);
    const redirectUrl = "http://localhost:3000/inbox";
    const response = "token";
    const client =
      "765722368782-j3bqp7gm072b0vd1lv97kgh2mnp37b7j.apps.googleusercontent.com";

    if (!props.isEmailAddressAndIdRetrieved) {
      // If user data not retrieved, retrieve email address and user_id from Auth token
      props.getUserEmailAndId(token).then(res => {
        console.log("GETUSERDATA RES: ", res);
        if (res) {
          props.changeIsLoggedIn(true);
        } else if (!res) {
          window.location.replace(
            `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//mail.google.com/ profile https%3A//www.googleapis.com/auth/userinfo.email https%3A//www.googleapis.com/auth/user.emails.read&redirect_uri=${redirectUrl}&response_type=${response}&client_id=${client}`
          );
          
        }
      });
    } else if (!props.areEmailsRetrieved) {
      // Else if user data retrieved AND emails not retrieved, retrieve emails
      const user_email = props.emailAddress;
      props.getEmails(user_email, token).then(res => {
        // console.log("GETEMAILS RES: ", res);
      });
    }

    console.log("EMAILS: ", props.emails);
  }, [props.isEmailAddressAndIdRetrieved, props.areEmailsRetrieved]);

  function extractTokenFromUrl(urlString) {
    // Parses OAuth access token from page URL
    const newSplit = urlString.split("");
    const tokenStartIndex = newSplit.findIndex(element => element === "=");
    const tokenEndIndex = newSplit.findIndex(element => element === "&");
    const token = newSplit
      .splice(tokenStartIndex + 1, tokenEndIndex - tokenStartIndex - 1)
      .join("");
    return token;
  }

  Swal.fire('Please wait for your messages to load. If this is your first time signing in, this may take a few minutes.')
  
  return (
    <S.Container>
      <Sidebar />
      <Emails />
    </S.Container>
     
  );
};

const mapStateToProps = ({ imap, user }) => ({
  emailAddress: user.emailAddress,
  user_id: user.user_id,
  isEmailAddressAndIdRetrieved: user.isEmailAddressAndIdRetrieved,
  areEmailsRetrieved: imap.areEmailsRetrieved,
  emails: imap.emails,
  isLoggedIn: user.isLoggedIn
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserEmailAndId,
      getEmails,
      changeIsLoggedIn
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Inbox);
