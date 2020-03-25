import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import ThreadMessage from "./ThreadMessage";
import { changeIsDisplayingAnalytics } from "../../actions";

const Thread = (props) => {
    // Commented out by Milo (were not used)
    // const toggleIsDisplayingAnalytics = () => {
    //     props.changeIsDisplayingAnalytics(!props.isDisplayingAnalytics);
    // };
// this creates an array of emails with matching gmThreadId's returned from google 
    const showThread = props.emails.filter((email) => email.gmThreadID === props.thread.gmThreadID);

    return (
        <>
            {/* this maps over the showThread array to display all emails in a thread */}
            {showThread.map((email) => {
                return <ThreadMessage token ={props.token} key={Math.random()} email={email} />;
            })}
        </>
    );
};

const mapStateToProps = ({ imap, inbox }) => ({
    emails: imap.emails,
    thread: inbox.thread
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            changeIsDisplayingAnalytics
        },
        dispatch
    );

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Thread);
