import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import ThreadMessage from "./ThreadMessage";

import Reply from "./Reply";

import { changeIsDisplayingAnalytics } from "../../actions";

const S = {
  Container: styled.div`
    width: 75%; //
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;

    padding: 0% 0.5%;
    background-color: #ebebeb;
  `
};

const Thread = props => {
  const toggleIsDisplayingAnalytics = () => {
    props.changeIsDisplayingAnalytics(!props.isDisplayingAnalytics);
  };

  const showThread = props.emails.filter(
    email => email.gmThreadID === props.thread.gmThreadID
  );

  return (
    <S.Container>
      {showThread.map(email => {
        return <ThreadMessage key={Math.random()} email={email} />;
      })}
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user, inbox }) => ({
  emailAddress: user.emailAddress,
  user_id: user.user_id,
  isEmailAddressAndIdRetrieved: user.isEmailAddressAndIdRetrieved,
  areEmailsRetrieved: imap.areEmailsRetrieved,
  emails: imap.emails,
  isLoggedIn: user.isLoggedIn,
  isDisplayingAnalytics: inbox.isDisplayingAnalytics,
  threadContactEmailAddress: inbox.threadContactEmailAddress,
  thread: inbox.thread
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeIsDisplayingAnalytics
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Thread);
