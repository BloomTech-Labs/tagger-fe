import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";


import Snippets from "./Snippets";
import Thread from "./Thread";
import AnalyticsBar from "./AnalyticsBar";


import { getUserEmailAndId, getEmails, changeIsLoggedIn } from "../../actions";

const S = {
  Container: styled.div`
    border: solid green 2px;
    width: calc(100% - 230px);
    display: flex;
    box-sizing: border-box;
  `,
};



const Emails = props => {

  return (
    <S.Container>
        <Snippets />
        {props.isDisplayingThread ? <Thread /> : null}
        {props.isDisplayingAnalytics && props.isDisplayingThread ? <AnalyticsBar /> : null}
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user, inbox }) => ({
  areEmailsRetrieved: imap.areEmailsRetrieved,
  emails: imap.emails,
  isDisplayingThread: inbox.isDisplayingThread,
  isDisplayingAnalytics: inbox.isDisplayingAnalytics
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
)(Emails);
