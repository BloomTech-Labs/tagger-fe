import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import Reply from "./Reply";
import { changeIsDisplayingAnalytics, changeAnalyticsContact } from "../../actions";

const S = {
    Container: styled.div`
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 0.5%;
        padding: 1%;
        font-size: 0.8rem;
        background-color: white;
        border-radius: 3px;
    `,
    ContactHeader: styled.div`
        display: flex;
        justify-content: space-between;
        height: 40px;
        box-sizing: border-box;
        width: 100%;
        align-items: center;
    `,
    ContactInfo: styled.div`
        width: 40%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        h3 {
            margin-left: 2%;
        }
    `,
    MessageActions: styled.div`
        width: 10%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .button {
            height: 20px;
            width: 20px;
        }
    `,
    Avatar: styled.div`
        height: 30px;
        width: 30px;
        background-color: black;
        border-radius: 15px;
    `,
    Subject: styled.h2``,
    Message: styled.article`
        text-align: left;
    `
};

const ThreadMessage = (props) => {
    const [replyIsHidden, setReplyIsHidden] = useState(true);
    const [responseType, setResponseType] = useState("Reply");

    const setAnalyticsContact = (email) => {
        console.log("EMAIL", email);

        const filter = props.contacts.filter((c) => c.emailAddresses[0].value === email.from);
        console.log("FILTER", filter);
        if (filter.length > 0) {
            const contact = {
                emailAddress: filter[0].emailAddresses,
                name: filter[0].names[0].displayName,
                coverPhoto: filter[0].photos[0].url
            };
            // console.log("IF", filter);
            props.changeAnalyticsContact(contact);
            props.changeIsDisplayingAnalytics(true);
        } else {
            const contact = {
                emailAddress: [{ value: email.from }],
                name: email.name
            };
            // Sets contact to be displayed in analytics sidebar
            props.changeAnalyticsContact(contact);
            props.changeIsDisplayingAnalytics(true);
        }
        // console.log("filter", filter)
    };

    return (
        <S.Container>
            <S.ContactHeader>
                <S.ContactInfo>
                    <S.Avatar onClick={() => setAnalyticsContact(props.email)} />
                    <h3 onClick={() => setAnalyticsContact(props.email)}>{props.email.name}</h3>
                </S.ContactInfo>
                <S.MessageActions>
                    <i
                        title="Reply"
                        style={{ border: "solid 1px red" }}
                        className="fa fa-reply button"
                        onClick={() => {
                            setReplyIsHidden(false);
                            setResponseType("Reply");
                        }}
                    ></i>
                    <i
                        title="Reply-All"
                        style={{ border: "solid 1px red" }}
                        className="fa fa-reply-all button"
                        onClick={() => {
                            setReplyIsHidden(false);
                            setResponseType("Reply-All");
                        }}
                    ></i>
                    <i
                        title="Delete Email"
                        style={{ border: "solid 1px red" }}
                        className="fas fa-trash-alt button"
                        onClick={() => {
                            setReplyIsHidden(false);
                            // todo: need a delete email function that moves the email from emails array in imap to a deleted array so that it lives inside of "trash" before permanently deleting
                        }}
                    ></i>
                </S.MessageActions>
            </S.ContactHeader>

            <S.Subject>{props.email.subject}</S.Subject>
            <S.Message>{props.email.email_body_text}</S.Message>
            {replyIsHidden ? null : (
                <Reply
                    responseType={responseType}
                    setResponseType={setResponseType}
                    email={props.email}
                    setReplyIsHidden={setReplyIsHidden}
                />
            )}
        </S.Container>
    );
};

const mapStateToProps = ({ imap, user, inbox, contacts }) => ({
    contacts: contacts.contacts
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
