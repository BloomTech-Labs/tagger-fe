import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import Emails from "./Emails";
import {
  getUserEmailAndId,
  changeIsLoggedIn,
  updateEmails,
  incrementCounter,
  getContacts,
  trainModel,
  setIsDisplayingDropdown,
  getBoxes
} from "../../actions";
import Sidebar from "./Sidebar";
import Compose from '../compose/Compose';

const Inbox = props => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const url = props.history.location.hash;
    const token = extractAccessTokenFromUrl(url);
    setToken(token);
    if (!props.areContactsRetrieved) {
      props
        .getContacts(token)
        .then(res => {})
        .catch(error => {
          console.log("Error", error);
        });
    }

    if (props.areEmailsRetrieved && !props.isModelTrained) {
      props.trainModel(props.emailAddress);
    }
  }, [props.areContactsRetrieved, props.areEmailsRetrieved]);

  function extractAccessTokenFromUrl(urlString) {
    // Parses OAuth access token from page URL
    const newSplit = urlString.split("");
    const tokenStartIndex = newSplit.findIndex(element => element === "=");
    const tokenEndIndex = newSplit.findIndex(element => element === "&");
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
    const id_token = urlString.substring(
      tokenStartIndex + 9,
      tokenStartIndex + tokenEndIndex
    );
    return id_token;
  }
  useEffect(() => {
    const email = props.emailAddress;
    const token = props.token;
    if (props.areBoxesRetrieved === false) {
      props.getBoxes(email, token);
    }
  }, [props.token, props.areBoxesRetrieved]);

  return (
    <>
    <main>
      <Sidebar token={token} />
      <Emails
        onClick={() => {
          props.setIsDisplayingDropdown(false);
        }}
        token={token}
      />
    </main>
    {props.isComposing && <Compose token={props.token} />}
    </>
  );
};

const mapStateToProps = ({ imap, user, contacts, inbox, searchbar, composer }) => ({
  emailAddress: user.emailAddress,
  user_id: user.user_id,
  userPhotoUrl: user.userPhotoUrl,
  isEmailAddressAndIdRetrieved: user.isEmailAddressAndIdRetrieved,
  areEmailsRetrieved: imap.areEmailsRetrieved,
  counter: imap.streamCounter,
  emails: imap.emails,
  isLoggedIn: user.isLoggedIn,
  areContactsRetrieved: contacts.areContactsRetrieved,
  contacts: contacts.contacts,
  sentEmails: inbox.sentEmails,
  boxes: user.boxes,
  areBoxesRetrieved: user.areBoxesRetrieved,
  isModelTrained: searchbar.isModelTrained,
  isComposing: composer.isComposing
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserEmailAndId,
      changeIsLoggedIn,
      getContacts,
      updateEmails,
      incrementCounter,
      trainModel,
      setIsDisplayingDropdown,
      getBoxes
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Inbox);
