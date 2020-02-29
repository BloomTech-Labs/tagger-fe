import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import Emails from "./Emails";

import {
    getUserEmailAndId,
    getEmails,
    changeIsLoggedIn,
    updateEmails,
    incrementCounter,
    getContacts,
    trainModel
} from "../../actions";

import Sidebar from "./Sidebar";
const S = {
    Container: styled.div`
        display: flex;
        height: calc(100vh - 64px);
    `
};

const Inbox = (props) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const url = props.history.location.hash;
        const token = extractAccessTokenFromUrl(url);
        setToken(token);
        if (!props.areContactsRetrieved) {
            props
                .getContacts(token)
                .then((res) => {})
                .catch((error) => {
                    console.log("Error", error);
                });
        }

        if (props.areEmailsRetrieved && !props.isModelTrained) {
            props.trainModel(props.emailAddress);
        }
    }, [props.areContactsRetrieved, props.areEmailsRetrieved]);

    function extractAccessTokenFromUrl(urlString) {
        // Parses OAuth access token from page URL
        const newSplit = urlString.split("");
        const tokenStartIndex = newSplit.findIndex((element) => element === "=");
        const tokenEndIndex = newSplit.findIndex((element) => element === "&");
        const token = newSplit
            .splice(tokenStartIndex + 1, tokenEndIndex - tokenStartIndex - 1)
            .join("");
        return token;
    }
    function extractIdTokenFromUrl(urlString) {
        const tokenStartIndex = urlString.indexOf("id_token=");
        const tokenEndIndex = urlString
            .substring(tokenStartIndex, urlString.length - 1)
            .indexOf("&");
        const id_token = urlString.substring(tokenStartIndex + 9, tokenStartIndex + tokenEndIndex);
        return id_token;
    }

    return (
        <S.Container>
            <Sidebar token={token} />
            <Emails />
        </S.Container>
    );
};

const mapStateToProps = ({ imap, user, contacts, inbox }) => ({
    emailAddress: user.emailAddress,
    user_id: user.user_id,
    userPhotoUrl: user.userPhotoUrl,
    isEmailAddressAndIdRetrieved: user.isEmailAddressAndIdRetrieved,
    areEmailsRetrieved: imap.areEmailsRetrieved,
    counter: imap.streamCounter,
    emails: imap.emails,
    isLoggedIn: user.isLoggedIn,
    areContactsRetrieved: contacts.areContactsRetrieved,
    contacts: contacts.contacts,
    sentEmails: inbox.sentEmails
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getUserEmailAndId,
            getEmails,
            changeIsLoggedIn,
            getContacts,
            updateEmails,
            incrementCounter,
            trainModel
        },
        dispatch
    );

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Inbox);
