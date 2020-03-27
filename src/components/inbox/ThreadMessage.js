import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import Reply from "./Reply";

import { changeIsDisplayingAnalytics, changeAnalyticsContact } from "../../actions";
import { setAnalyticsContact } from "./helpers/AnalyticsHelper";
import FullHeightIFrame from "./FullHeightIFrame";
import SmartButton from "./SmartButton";

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle, faReply, faReplyAll, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const ThreadMessage = props => {
  const [replyIsHidden, setReplyIsHidden] = useState(true);
  const [responseType, setResponseType] = useState("Reply");
  function setContact() {
    if (props.snippetsFilter === "\\Sent" || props.snippetsFilter === "\\Draft" ) {
      setAnalyticsContact(props, props.email.to[0])
    } else {
      setAnalyticsContact(props, props.email)
    }
  }
  return (
    <>
    <SimpleBar forceVisible="y" autoHide={true} style={{height:'100%'}}>
    <div className="thread-window">
      <div className="thread-head row">
        <div className="thread-contact row btn">
          {/* The onClick for avatar sets the analytics contact  */}
          <FontAwesomeIcon icon={faUserCircle} onClick={() => setContact()} className="thread-avatar" />
          {/* this ternary checks if the snippetsFilter is set to "\Sent" or "\Draft" and if it is, it maps over the to array from the email object to display every email address the email was sent to. If the snippetsFilter is not set to "\Sent" or "\Draft" it displays the name of whoever sent the email if they have one, otherwise it displays the email of whoever sent it to */}
          {(props.snippetsFilter === "\\Sent" && props.email.to) ||
          (props.snippetsFilter === "\\Draft" && props.email.to) ? (
            props.email.to.map((contact, i) => {
              var arrayLength = props.email.to.length;
              return (
                <span
                  key={Math.random()}
                  onClick={() => setAnalyticsContact(props, contact)}
                >
                  {/* the JavaScript below this adds a comma after all email addresses except for the last one */}
                  {i !== arrayLength - 1 ? contact + ", " : contact}
                </span>
              );
            })
          ) : props.email.name ? (
            <h3 onClick={() => setAnalyticsContact(props, props.email)}>
              {props.email.name}
            </h3>
          ) : (
            <h3 onClick={() => setAnalyticsContact(props, props.email)}>
              {props.email.from}
            </h3>
          )}
        </div>
        <div className="thread-actions row">
        <SmartButton thisEmail={props.email} />
          <FontAwesomeIcon 
            icon={faReply}
            onClick={() => {
              setReplyIsHidden(false);
              setResponseType("Reply");
            }} 
          />
          <FontAwesomeIcon 
            icon={faReplyAll}
            onClick={() => {
              setReplyIsHidden(false);
              setResponseType("Reply-All");
            }}
          /> 
          <FontAwesomeIcon 
            icon={faTrashAlt}
            onClick={() => {
              setReplyIsHidden(false);
              // todo: need a delete email function that moves the email from emails array in imap to a deleted array so that it lives inside of "trash" before permanently deleting
            }}
          />
        </div>
      </div>

      <h2>{props.email.subject}</h2>
      { /* the spinner displays if isLoaded is false  */}
      <div className="spinner"
        style={{
          display:
            props.isLoaded === false
              ? "block"
              : props.email.email_body === "false" ||
                props.email.email_body === "0" ||
                props.isLoaded === true
              ? "none"
              : "block"
        }}
      ></div>
      {/* the ternary below checks to see if the email object has html if it doesn't then it displays the the plain text instead of the HTML */}
      {props.email.email_body === "false" || props.email.email_body === "0" ? (
        <div className="thread-message">{props.email.email_body_text}</div>
      ) : (
        <FullHeightIFrame src={props.email.email_body} />
      )}
      {/* the ternary below checks to see if replyIsHidden is true, if it is the Reply component is hidden, if it's false the reply component is shown */}
      {replyIsHidden ? null : (
        <Reply
          responseType={responseType}
          setResponseType={setResponseType}
          email={props.email}
          setReplyIsHidden={setReplyIsHidden}
          token={props.token}
        />
      )}
    </div>
    </SimpleBar>
    </>
  );
};

const mapStateToProps = ({ inbox, contacts }) => ({
    contacts: contacts.contacts,
    isLoaded: inbox.isIframeLoaded,
    snippetsFilter: inbox.snippetsFilter,
    analyticsContact: inbox.analyticsContact
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            changeIsDisplayingAnalytics,
            changeAnalyticsContact
        },
        dispatch
    );

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ThreadMessage);
