import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import Snippets from "./Snippets";
import Thread from "./Thread";
import AnalyticsBar from "./AnalyticsBar";

// const S = {
//   Container: styled.div`
//     width: calc(100% - 230px);
//     display: flex;
//     height: calc(100-64px)
//     box-sizing: border-box;
//   `
// };

const Emails = props => {
  return (
    <>
      <div className={props.isDisplayingThread ? 'email-list-340' : 'email-list'}>
        <Snippets />
      </div>
      <div className={props.isDisplayingThread && 'email-body'} id={props.isDisplayingAnalytics && 'email-body-analytics'}>
        {props.isDisplayingThread ? <Thread token={props.token}/> : null}
        {(props.isDisplayingAnalytics && props.isDisplayingThread) && <AnalyticsBar />}
      </div>
    </>
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
