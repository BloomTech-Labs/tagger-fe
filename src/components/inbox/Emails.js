import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import Snippets from "./Snippets";
import Thread from "./Thread";


import { getUserEmailAndId, getEmails, changeIsLoggedIn } from "../../actions";

const S = {
  Container: styled.div`
    border: solid green 2px;
    width: calc(100% - 200px);
    display: flex;
  `,
};



const Emails = props => {

  return (
    <S.Container>
        <Snippets />
        {props.isDisplayingThread ? <Thread /> : null}
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user, inbox }) => ({
  emailAddress: user.emailAddress,
  user_id: user.user_id,
  isEmailAddressAndIdRetrieved: user.isEmailAddressAndIdRetrieved,
  areEmailsRetrieved: imap.areEmailsRetrieved,
  emails: imap.emails,
  isLoggedIn: user.isLoggedIn,
  isDisplayingThread: inbox.isDisplayingThread
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
     
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Emails);
