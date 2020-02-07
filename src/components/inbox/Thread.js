import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";


import { getUserEmailAndId, getEmails, changeIsLoggedIn } from "../../actions";

const S = {
  Container: styled.div`
    border: solid red 5px;
    width: 75%;
  `,
};



const Thread = props => {

  return (
    <S.Container>
        Thread
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user }) => ({
  emailAddress: user.emailAddress,
  user_id: user.user_id,
  isEmailAddressAndIdRetrieved: user.isEmailAddressAndIdRetrieved,
  areEmailsRetrieved: imap.areEmailsRetrieved,
  emails: imap.emails,
  isLoggedIn: user.isLoggedIn
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
)(Thread);
