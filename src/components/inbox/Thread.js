import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import ThreadMessage from "./ThreadMessage";
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
// this creates an array of emails with matching gmThreadId's returned from google 
  const showThread = props.emails.filter(
    email => email.gmThreadID === props.thread.gmThreadID
  );

  return (
    <S.Container>
      {/* this maps over the showThread array to display all emails in a thread */}
      {showThread.map(email => {
        return <ThreadMessage key={Math.random()} email={email} token={props.token} />;
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
