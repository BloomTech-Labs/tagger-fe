import React from "react";
import styled from "styled-components";
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
const moment = require("moment");

const S = {
    Container: styled.div`
        width: 100%;
        height: ${(props) => props.heightInPx}px;
        box-sizing: border-box;
        font-size: 0.8rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 3px 1%;
        border-bottom: solid #e0e0e0 1px;
        :hover {
            background-color: #80808038;
            cursor: pointer;
        }
    `,
    SnipHeader: styled.div`
        width: 100%;
        // border: solid green 1px;
        height: 30px;
        display: flex;
        align-items: center;
        // background-color: yellow;

        h3 {
            margin: 0px;
            overflow: hidden;
            white-space: nowrap;
            word-break: break-word;
            text-align: left;
            text-overflow: ellipsis;
        }
        div {
            width: calc(100% - 30px);
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #00000000;

            :hover {
                color: #2196f3;
                font-weight: 900;
                border-bottom: 1px solid #00000033;
                text-shadow: 0px 1px #2196f387;
                cursor: pointer;
            }
            :active {
                background: #9893613b;
                -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
                -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
                box-shadow: inset 0px 0px 5px #c1c1c1;
                outline: none;
                cursor: pointer;
            }
        }
    `,
    Avatar: styled.img`
        width: 30px;
        height: 30px;
        background-color: black;
        border-radius: 15px;
        margin: 0px;
        margin-right: 1%;
        :hover {
            cursor: pointer;
        }
    `,
    Subject: styled.div`
        font-weight: 700;
        width: 100%;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-word;
        text-align: left;
        text-overflow: ellipsis;
    `,
    Message: styled.div`
        width: 100%;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-word;
        text-align: left;
        text-overflow: ellipsis;
    `
};

const Snippet = (props) => {
    const setThreadContact = () => {
        const emailObj = props.email;
        emailObj.email_body === "false" || emailObj.email_body === "0"
            ? props.changeIsLoaded(true)
            : props.changeIsLoaded(false);
        props.changeThreadContact(emailObj);
    };

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

    return (
        <S.Container
            heightInPx={props.isDisplayingThread ? (props.isDisplayingAnalytics ? 100 : 80) : 75}
            onClick={() => setThreadContact()}
        >
            <S.SnipHeader>
                <S.Avatar
                    onClick={() =>
                        props.snippetsFilter === "\\Sent"
                            ? setAnalyticsContact(props, props.email.to[0])
                            : props.snippetsFilter === "\\Inbox"
                            ? setAnalyticsContact(props, props.email)
                            : null
                    }
                />
                <div>
                    <h3
                        onClick={() =>
                            props.snippetsFilter === "\\Sent"
                                ? setAnalyticsContact(props, props.email.to[0])
                                : props.snippetsFilter === "\\Inbox"
                                ? setAnalyticsContact(props, props.email)
                                : null
                        }
                    >
                        {props.snippetsFilter === "\\Inbox"
                            ? props.email.name
                                ? props.email.name
                                : props.email.from
                            : props.snippetsFilter === "\\Sent" && props.email.to.length > 1
                            ? props.email.to[0] + " + " + parseInt(props.email.to.length - 1)
                            : props.email.to[0]}
                    </h3>
                    <h3>{showDate(props.email.date)}</h3>
                </div>
            </S.SnipHeader>
            <S.Subject>{props.email.subject}</S.Subject>
            <S.Message>{props.email.email_body_text}</S.Message>
        </S.Container>
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
