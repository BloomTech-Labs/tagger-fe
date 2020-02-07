import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";


import { changeIsDisplayingAnalytics } from "../../actions";

const S = {
  Container: styled.div`
    border: solid red 5px;
    width: 75%; // 40 if displaying analyticsbar
    height: 100%;
    box-sizing: border-box;

  `,
};



const Thread = props => {

  const toggleIsDisplayingAnalytics = () => {
    props.changeIsDisplayingAnalytics(!props.isDisplayingAnalytics)
  }

  return (
    <S.Container>
        <h1>Thread</h1>
        <button onClick = {() => toggleIsDisplayingAnalytics()}>Toggle Analytics ON/OFF</button>
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
  isDisplayingAnalytics: inbox.isDisplayingAnalytics
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
