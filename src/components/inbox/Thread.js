import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import ThreadMessage from "./ThreadMessage";


import { changeIsDisplayingAnalytics } from "../../actions";

const S = {
  Container: styled.div`
    border: solid red 5px;
    width: 75%; // 
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    padding: .5%;
  `,
};



const Thread = props => {

  const toggleIsDisplayingAnalytics = () => {
    props.changeIsDisplayingAnalytics(!props.isDisplayingAnalytics)
  }

  return (
    <S.Container>
        {/* <h1>Thread between you & {props.threadContactEmailAddress}</h1>
        <button onClick = {() => toggleIsDisplayingAnalytics()}>Toggle Analytics ON/OFF</button> */}

        {props.emails.filter((email) => {
          return email.fromEmailAddress === props.threadContactEmailAddress
        }).map((email) => {
          return (
            <ThreadMessage email = {email}/>
          )
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
