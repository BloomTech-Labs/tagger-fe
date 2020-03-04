import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import ThreadMessage from "./ThreadMessage";
import { changeIsDisplayingAnalytics } from "../../actions";

const S = {
    Container: styled.div`
        width: 75%; //
        height: 100%;
        box-sizing: border-box;
        overflow-y: auto;

        padding: 0% 0.5%;
        background-color: #ebebeb;
    `
};

const Thread = (props) => {
    const toggleIsDisplayingAnalytics = () => {
        props.changeIsDisplayingAnalytics(!props.isDisplayingAnalytics);
    };
// this creates an array of emails with matching gmThreadId's returned from google 
    const showThread = props.emails.filter((email) => email.gmThreadID === props.thread.gmThreadID);

    return (
        <S.Container>
            {/* this maps over the showThread array to display all emails in a thread */}
            {showThread.map((email) => {
                return <ThreadMessage token = {props.token}key={Math.random()} email={email} />;
            })}
        </S.Container>
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
