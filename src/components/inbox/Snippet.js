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
    `
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
            {/* <h3>{props.email.fromName}</h3> */}
            <span>{props.email.subject}</span>
            {/* <span>{props.email.text}</span> */}
            <div>{props.email.fromEmailAddress}</div>

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
  