import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";


import { changeIsDisplayingThread } from "../../actions";

const S = {
  Container: styled.div`
    width: ${props => props.widthPercentage}%;
    height: 100%;
    border: solid black 3px;
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
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user, inbox }) => ({
  isDisplayingThread: inbox.isDisplayingThread,
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
