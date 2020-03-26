import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { changeIsLoaded } from "../../actions/inboxActions";
import {
    changeThreadContact,
    changeIsDisplayingThread,
    changeAnalyticsContact,
    changeIsDisplayingAnalytics
} from "../../actions";
import { setAnalyticsContact } from "./helpers/AnalyticsHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

const moment = require("moment");

const Snippet = (props) => {
    // this function sets the Thread Contact and sets the changeIsLoaded to true if the email body has no HTML so the spinner doesn't load
    // If the email does have HTML it sets changeIsLoaded to false so the spinner goes away after clicking on a new snippet
    const setThreadContact = () => {
        const emailObj = props.email;
        emailObj.email_body === "false" || emailObj.email_body === "0"
            ? props.changeIsLoaded(true)
            : props.changeIsLoaded(false);
        props.changeThreadContact(emailObj);
    };

    // This function converts the unix date string to a readable date
    function showDate() {
        let formatDate;
        if (typeof props.email.date === "string") {
            if (props.email.date.includes("T") || props.email.date.includes("-")) {
                formatDate = new Date(props.email.date);
            } else {
                formatDate = new Date(Number(props.email.date));
            }
        } else {
            formatDate = new Date(props.email.date);
        }

        let emailDateYear = moment(formatDate).format("YYYY");
        let currentYear = moment().format("YYYY");
        if (emailDateYear === currentYear) {
            return moment(formatDate).format("MMM Do");
        } else {
            return moment(formatDate).format("MMM Do YYYY");
        }
    }
function setContact() {
    if (props.snippetsFilter === "\\Sent" || props.snippetsFilter === "\\Draft"){
        setAnalyticsContact(props, props.email.to[0])
    } else if (props.snippetsFilter === "\\Inbox") {
        setAnalyticsContact(props, props.email)
    }
}
/* showContact() is a check for when the "to" array from the email object has multiple people it will display the first one and add a "+n" to the end so the user know how many people it was sent to. It also checks the snippetsFilter to to check whether to display who the email was sent to or who it is from*/
function showContact() {
    if (props.snippetsFilter === "\\Sent" ||props.snippetsFilter === "\\Draft" ){
        if (props.email.to.length > 1){
            return  props.email.to[0] + " + " + parseInt(props.email.to.length - 1)
        } else {return  props.email.to[0]}
    } else if(props.email.name){
        return props.email.name
    } else {
        return props.email.from
    }
}
  return (
      <>
    <div className="snippet" onClick={() => setThreadContact()}>
        <div className="snippet-header row">
            {/* the onClick in here sets the analyticsContact to either who sent the email or who it was sent to depending on the snippetsFilter */}
            <FontAwesomeIcon icon={faUserCircle} onClick={() => setContact()} />
            <div className="snippet-meta row">
                {/* This ternary checks whether to display who its from or who it was sent to depending on what snippetsFilter is set to */}
                <h3 onClick={() =>setContact()} >
                    {showContact()}
                </h3>
                <time>
                    {showDate(props.email.date)}
                </time>
            </div>
        </div>
        <p className="snippet-subject">
            {props.email.subject}
        </p>
        <p className="snippet-message">
            {props.email.email_body_text}
        </p>
    </div>
    </>
  );
};

const mapStateToProps = ({ imap, user, inbox, contacts }) => ({
    isDisplayingThread: inbox.isDisplayingThread,
    isDisplayingAnalytics: inbox.isDisplayingAnalytics,
    contacts: contacts.contacts,
    isLoaded: inbox.isIframeLoaded,
    snippetsFilter: inbox.snippetsFilter
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            changeThreadContact,
            changeIsDisplayingThread,
            changeAnalyticsContact,
            changeIsDisplayingAnalytics,
            changeIsLoaded
        },
        dispatch
    );

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Snippet);
