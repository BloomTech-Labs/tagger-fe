import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";


import { changeThreadContact, changeIsDisplayingThread } from "../../actions";

const S = {
    Container: styled.div`
        width: 100%;
        height: ${props => props.heightInPx}px;
        border: solid red 1px;
        box-sizing: border-box;
        font-size: .8rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px 1%;

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
    `,
    Avatar: styled.div`
        width: 30px;
        height: 30px;
        background-color: black;
        border-radius: 15px;
        margin: 0px;
        margin-right: 1%;
    `,
    Subject: styled.div`
        
    `,
    Message: styled.div`
        text-align: left;
        overflow: hidden;
    `,
}

const Snippet = (props) => {

    const setThreadContact = () => {
        // Sets contact in thread section to be the one from this snippet
        props.changeThreadContact(props.email.fromEmailAddress)
        if (!props.isDisplayingThread){
            props.changeIsDisplayingThread(true)
        }
    }

    return (
        <S.Container 
            heightInPx = {props.isDisplayingThread ? (props.isDisplayingAnalytics ? 100 : 80) : 60}
            onClick = {() => setThreadContact()}
        >
            {/* <h3>{props.email.fromName}</h3>
            <span>{props.email.subject}</span>
            <span>{props.email.text}</span>
            <div>{props.email.fromEmailAddress}</div> */}
            <S.SnipHeader>
              <S.Avatar />
              <h3>{props.email.fromName}</h3>
            </S.SnipHeader>
          <S.Subject>{props.email.subject}</S.Subject>
          <S.Message>{props.email.text}</S.Message>

        </S.Container>
    )

}

const mapStateToProps = ({ imap, user, inbox }) => ({
    isDisplayingThread: inbox.isDisplayingThread,
    isDisplayingAnalytics: inbox.isDisplayingAnalytics,
});
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        changeThreadContact,
        changeIsDisplayingThread
      },
      dispatch
    );
  
  export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
  )(Snippet);
  