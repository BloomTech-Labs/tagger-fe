import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { changeIsDisplayingAnalytics } from "../../actions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const AnalyticsBar = props => {
  // changes the isDisplayingAnalyticsBar to false to not show the analytics bar
  const closeAnalytics = () => {
    props.changeIsDisplayingAnalytics(false);
  };
// creates an array of all emails with "\Sent" in the label array
  const sent = props.emails.filter(email => email.labels.includes("\\Sent"));
// creates an array of all emails with "\Inbox" in the label array
  const inbox = props.emails.filter(email => email.labels.includes("\\Inbox"));
// creates an array of all emails sent to whoever is set as the analytics contact
// console.log(props.analyticsContact)
  const totalSent = sent.filter(email =>
    email.to.includes(
      props.analyticsContact.emailAddress[0].value.toLowerCase()
    )
  );
  // creates an array of all emails received from whoever is set as the analytics contact
  const totalReceived = inbox.filter(email =>
    props.analyticsContact.emailAddress.some(
      e => e.value === email.from.toLowerCase() || e.value === email.from
    )
  );
// brings back the total number of emails sent/received from whoever is set as the analytics contact
  const totalEmails = totalSent.length + totalReceived.length;
  const receivedWidth = (totalReceived.length / totalEmails) * 100 + "%";
  const sentWidth = (totalSent.length / totalEmails) * 100 + "%";

  return (
    <div className="analytics-bar">
      <FontAwesomeIcon icon={faTimesCircle} className="analytics-bar-close btn" onClick={() => closeAnalytics()}/>
      {/* <button onClick={() => closeAnalytics()}>X</button> */}
      {/*If the contact has a cover photo display it, if not display the placeholder image*/}
      {/* <S.Avatar
        src={
          props.analyticsContact.coverPhoto
            ? props.analyticsContact.coverPhoto
            : "https://i.postimg.cc/kX2k4dmS/avatar-Placeholder.png"
        }
      /> */}
      <div className="analytics-avatar col">
        <FontAwesomeIcon icon={faUserCircle} className="analytics-bar-avatar"/>
        <h2>{props.analyticsContact.name}</h2>
        {/* Maps over the "to" array from the email object to display everyone it was sent to */}
        {props.analyticsContact.emailAddress.map(email => {
          return <p key={Math.random()}>{email.value}</p>;
        })}
      </div>
      <div className="analytics-body">
          <p>Total messages</p>
          <div style={{width:'100%'}} className="barwidth">
            <span className="num">{totalEmails}</span>
          </div>

          <p>Sent messages</p>
          <div style={{width:sentWidth}} className="barwidth">
            <span className="num">{totalSent.length}</span>
          </div>

          <p>Received messages</p>
          <div style={{width:receivedWidth}} className="barwidth">
            <span className="num">{totalReceived.length}</span>
          </div>
        </div>
      {/* <S.LastInteraction>
        <span>Last interaction:</span>
        <span>2 hours ago</span>
      </S.LastInteraction> */}
    </div>
  );
};

const mapStateToProps = ({ imap, user, inbox, contacts }) => ({
  analyticsContact: inbox.analyticsContact,
  contacts: contacts.contacts,
  emails: imap.emails
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
)(AnalyticsBar);
