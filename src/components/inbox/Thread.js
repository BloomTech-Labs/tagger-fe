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

  InitReplyBtn: styled.button`
    position: absolute;
    bottom: 10px; 
    right: calc(((100% - 230px) * .23) + 10px);
    // right: 30%;
    width: 8vw;
    height: 60px;
    z-index: 100;
    background-color: black;

    border-radius: 5px;
    font-size: 1.5rem;
    background-color: #007bff;
    color: white;

  `

};

const Thread = props => {
  const toggleIsDisplayingAnalytics = () => {
    props.changeIsDisplayingAnalytics(!props.isDisplayingAnalytics);
  };

  const [isReplying, setIsReplying] = useState(false);

  const toggleIsReplying = () => {
    console.log(isReplying)
    setIsReplying(!isReplying)
  }


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
      
      {isReplying ? null : <S.InitReplyBtn onClick = {toggleIsReplying}>Reply</S.InitReplyBtn>}
      {isReplying? <Reply toggleIsReplying = {toggleIsReplying} threadContactEmailAddress={props.threadContactEmailAddress} /> : null}
    
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
