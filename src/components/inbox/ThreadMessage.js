import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import parse from "html-react-parser";
import {
  changeIsDisplayingAnalytics,
  changeAnalyticsContact
} from "../../actions";

const S = {
  Container: styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
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

    button {
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
    text-align: center;
  `
};

const ThreadMessage = props => {
  const setAnalyticsContact = email => {
    const filter = props.contacts.filter(
      c => c.emailAddresses[0].value === email.from
    );
    if (filter.length > 0) {
      const contact = {
        emailAddress: filter[0].emailAddresses,
        name: filter[0].names[0].displayName,
        coverPhoto: filter[0].photos[0].url
      };
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
  };

  return (
    <S.Container>
      <S.ContactHeader>
        <S.ContactInfo>
          <S.Avatar onClick={() => setAnalyticsContact(props.email)} />
          <h3 onClick={() => setAnalyticsContact(props.email)}>
            {props.email.name}
          </h3>
        </S.ContactInfo>
        <S.MessageActions>
          <button />
          <button />
          <button />
        </S.MessageActions>
      </S.ContactHeader>

      <S.Subject>{props.email.subject}</S.Subject>
      <S.Message>{parse(props.email.email_body)}</S.Message>
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user, inbox, contacts }) => ({
  contacts: contacts.contacts
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeIsDisplayingAnalytics,
      changeAnalyticsContact
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ThreadMessage);
