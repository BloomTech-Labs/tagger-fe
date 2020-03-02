import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

import { changeIsDisplayingThread } from "../../actions";
import Snippet from "./Snippet.js";

// This is the styling for the snippets Component
const S = {
  Container: styled.div`
    width: ${props => props.widthPercentage}%;
    height: calc(100vh-64px);
    overflow-y: auto;
    padding: 0.5%;
  `
};

const Snippets = props => {
  return (
    <S.Container widthPercentage={props.isDisplayingThread ? 25 : 100}>
     {/* filters and creates an array depending on what snippetsFilter is set to, then maps over the array to display email snippets */}
      {props.emails
        .filter(email => {
          return email.labels.includes(props.snippetsFilter);
        })
        .map(email => {
          return (
            <Snippet key={email.message_id} email={email} /> 
          );
        })}
    </S.Container>
  );
};

const mapStateToProps = ({ imap, inbox }) => ({
  isDisplayingThread: inbox.isDisplayingThread,
  areEmailsRetrieved: imap.areEmailsRetrieved,
  emails: imap.emails,
  snippetsFilter: inbox.snippetsFilter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeIsDisplayingThread
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Snippets);
