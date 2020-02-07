import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";


import { changeIsDisplayingThread } from "../../actions";
import Snippet from "./Snippet.js";

const S = {
  Container: styled.div`
    width: ${props => props.widthPercentage}%;
    height: calc(100vh-64px);
    border: solid black 3px;
    overflow-y: auto;
  `,
};



const Snippets = props => {

  const toggleIsDisplayingThread = () => {
      props.changeIsDisplayingThread(!props.isDisplayingThread)
  }

  return (
    <S.Container widthPercentage = {props.isDisplayingThread ? 25 : 100}>
        <h1>Snippets</h1>
        <button onClick = {() => toggleIsDisplayingThread()}>Toggle Thread ON/OFF</button>
        {props.emails.map((email) => {
          return (
            <Snippet key = {email.message_id} email = {email}/> // emails in redux are currently numbers 1-10 in an array
          )
        })}
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user, inbox }) => ({
  isDisplayingThread: inbox.isDisplayingThread,
  areEmailsRetrieved: imap.areEmailsRetrieved,
  emails: imap.emails,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        changeIsDisplayingThread
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Snippets);
