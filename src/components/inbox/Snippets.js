import React, { useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import { changeIsDisplayingThread } from "../../actions";
import Snippet from "./Snippet.js";

// This is the styling for the snippets Component
const S = {
    Container: styled.div`
        width: ${(props) => props.widthPercentage}%;
        height: calc(100vh-64px);
        overflow-y: auto;
        padding: 0.5%;
    `
};

const Snippets = (props) => {
    const toggleIsDisplayingThread = () => {
        props.changeIsDisplayingThread(!props.isDisplayingThread);
    };
    let filteredEmail = [];
   
    if (props.smartSearchResults.length > 0) {
        filteredEmail = props.smartSearchResults;
    } else if (props.searchResults.length > 0 && props.isDisplayingInSnippets){
        filteredEmail = props.searchResultsStatic;
    } else {
        filteredEmail = props.emails.filter((email) => {
            return email.labels.includes(props.snippetsFilter);
        });
    }
    useEffect(() => {
        if (props.smartSearchResults.length > 0) {
            filteredEmail = props.smartSearchResults;
        } else if (props.searchResults.length > 0 && props.isDisplayingInSnippets){
            filteredEmail = props.searchResultsStatic;
        } else {
            filteredEmail = props.emails.filter((email) => {
                return email.labels.includes(props.snippetsFilter);
            });
        }
    }, [props.smartSearchResults]);

    return (
        <S.Container widthPercentage={props.isDisplayingThread ? 25 : 100}>
            {filteredEmail.map((email) => {
                return (
                    <Snippet key={email.message_id} email={email} /> // emails in redux are currently numbers 1-10 in an array
                );
            })}
        </S.Container>
    );
};

const mapStateToProps = ({ imap, inbox, searchbar }) => ({
    isDisplayingThread: inbox.isDisplayingThread,
    areEmailsRetrieved: imap.areEmailsRetrieved,
    emails: imap.emails,
    snippetsFilter: inbox.snippetsFilter,
    smartSearchResults: searchbar.smartSearchResults,
    searchResults: searchbar.searchResults,
    searchResultsStatic: searchbar.searchResultsStatic,
    isDisplayingInSnippets: searchbar.isDisplayingInSnippets
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            changeIsDisplayingThread
        },
        dispatch
    );

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Snippets);
