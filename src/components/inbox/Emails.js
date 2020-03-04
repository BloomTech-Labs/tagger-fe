import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import Snippets from "./Snippets";
import Thread from "./Thread";
import AnalyticsBar from "./AnalyticsBar";

const S = {
  Container: styled.div`
    width: calc(100% - 230px);
    display: flex;
    height: calc(100-64px)
    box-sizing: border-box;
  `
};

const Emails = props => {
  return (
    <S.Container>
      <Snippets />
      {props.isDisplayingThread ? <Thread token={props.token}/> : null}
      {props.isDisplayingAnalytics && props.isDisplayingThread ? (
        <AnalyticsBar />
      ) : null}
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user, inbox }) => ({
  areEmailsRetrieved: imap.areEmailsRetrieved,
  emails: imap.emails,
  isDisplayingThread: inbox.isDisplayingThread,
  isDisplayingAnalytics: inbox.isDisplayingAnalytics
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Emails);
