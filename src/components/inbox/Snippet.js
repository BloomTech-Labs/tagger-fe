import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";


// import {  } from "../../actions";

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

    return (
        <S.Container heightInPx = {props.isDisplayingThread ? (props.isDisplayingAnalytics ? 100 : 80) : 60}>
            {/* <h3>{props.email.fromName}</h3> */}
            <span>{props.email.subject}</span>
            {/* <span>{props.email.text}</span> */}
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
      },
      dispatch
    );
  
  export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
  )(Snippet);
  