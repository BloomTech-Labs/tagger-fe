import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import Snippets from "./Snippets";
import Thread from "./Thread";
import AnalyticsBar from "./AnalyticsBar";

const Emails = props => {
  return (
    <>
      <div className={props.isDisplayingThread ? 'email-list-min' : 'email-list'}>
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
