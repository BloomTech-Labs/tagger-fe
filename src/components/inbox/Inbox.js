import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import {
  sampleFunction,
  getUserEmailAndId,
  getEmails
} from "../../actions/actions";

const S = {};

S.Container = styled.div`
  border: solid black 1px;
`;

const Inbox = props => {
  useEffect(() => {
    console.log("useEffect() in main/Main.jsx");

    const url = props.history.location.hash;
    const token = extractTokenFromUrl(url);

    if (!props.isEmailAddressAndIdRetrieved) {
      // If user data not retrieved, retrieve email address and user_id from Auth token
      props.getUserEmailAndId(token).then(res => {
        console.log("GETUSERDATA RES: ", res);
      });
    } else if (!props.areEmailsRetrieved) {
      // Else if user data retrieved AND emails not retrieved, retrieve emails
      const user_email = props.emailAddress;
      props.getEmails(user_email, token).then(res => {
        console.log("GETEMAILS RES: ", res);
      });
    }

    console.log("EMAILS: ", props.emails);
  }, [props.isEmailAddressAndIdRetrieved, props.areEmailsRetrieved]);

  return <S.Container>Inbox</S.Container>;
};

const mapStateToProps = state => ({
  labelsResult: state.labelsResult,
  messagesResult: state.messagesResult,
  pageTokens: state.pageTokens,
  searchQuery: state.searchQuery,

  // LABS20
  sampleState: state.userReducer.sampleState,
  emailAddress: state.userReducer.emailAddress,
  user_id: state.userReducer.user_id,
  isEmailAddressAndIdRetrieved: state.userReducer.isEmailAddressAndIdRetrieved,
  areEmailsRetrieved: state.userReducer.areEmailsRetrieved,
  emails: state.userReducer.emails
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Inbox);
