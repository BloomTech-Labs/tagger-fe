import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import {
  changeThreadContact,
  changeIsDisplayingThread,
  changeAnalyticsContact,
  changeIsDisplayingAnalytics
} from "../../actions";

const S = {
  Container: styled.div`
    width: 100%;
    height: ${props => props.heightInPx}px;
    box-sizing: border-box;
    font-size: 0.8rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3px 1%;
    border-bottom: solid #e0e0e0 1px;
  `,
  SnipHeader: styled.div`
    width: 100%;
    // border: solid green 1px;
    height: 30px;
    display: flex;
    align-items: center;
    // background-color: yellow;

    h3 {
      margin: 0px;
    }

    div {
      width: calc(100% - 30px);
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  Avatar: styled.img`
    width: 30px;
    height: 30px;
    background-color: black;
    border-radius: 15px;
    margin: 0px;
    margin-right: 1%;
  `,
  Subject: styled.div`
    font-weight: 700;
  `,
  Message: styled.div`
    text-align: left;
    overflow: hidden;
  `
};

const Snippet = props => {
  const setThreadContact = () => {
    // Sets contact in thread section to be the one from this snippet
    props.changeThreadContact(props.email.fromEmailAddress);
    if (!props.isDisplayingThread) {
      props.changeIsDisplayingThread(true);
    }
  };

  const setAnalyticsContact = email => {
    const contact = {
      emailAddress: email.fromAddress,
      name: email.fromName
    };
    // Sets contact to be displayed in analytics sidebar
    props.changeAnalyticsContact(contact);
    props.changeIsDisplayingAnalytics(true);
  };

  return (
    <S.Container
      heightInPx={
        props.isDisplayingThread ? (props.isDisplayingAnalytics ? 100 : 80) : 75
      }
      onClick={() => setThreadContact()}
    >
      {/* <h3>{props.email.fromName}</h3>
            <span>{props.email.subject}</span>
            <span>{props.email.text}</span>
            <div>{props.email.fromEmailAddress}</div> */}
      <S.SnipHeader>
        <S.Avatar onClick={() => setAnalyticsContact(props.email)} />
        <div>
          <h3 onClick={() => setAnalyticsContact(props.email)}>
            {props.email.fromName}
          </h3>
          <h3>2 days ago</h3>
        </div>
      </S.SnipHeader>
      <S.Subject>{props.email.subject}</S.Subject>
      <S.Message>{props.email.text}</S.Message>
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user, inbox }) => ({
  isDisplayingThread: inbox.isDisplayingThread,
  isDisplayingAnalytics: inbox.isDisplayingAnalytics
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeThreadContact,
      changeIsDisplayingThread,
      changeAnalyticsContact,
      changeIsDisplayingAnalytics
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Snippet);
