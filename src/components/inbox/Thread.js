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

    padding: 0% .5%;
    background-color: #ebebeb;
  `,

};

const Thread = props => {
  const toggleIsDisplayingAnalytics = () => {
    props.changeIsDisplayingAnalytics(!props.isDisplayingAnalytics);
  };

  return (
    <S.Container>

        {/* <h1>Thread between you & {props.threadContactEmailAddress}</h1>
        <button onClick = {() => toggleIsDisplayingAnalytics()}>Toggle Analytics ON/OFF</button> */}


      {props.emails
        .filter(email => {
          return email.fromEmailAddress === props.threadContactEmailAddress;
        })
        .map(email => {
          return (

            <ThreadMessage key = {Math.random()} email = {email}/>
          )

        })}

      <Reply threadContactEmailAddress={props.threadContactEmailAddress} />
    
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
  threadContactEmailAddress: inbox.threadContactEmailAddress
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
