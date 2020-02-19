import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import parse from "html-react-parser";
import IframeResizer from "iframe-resizer-react";
import {
  changeIsDisplayingAnalytics,
  changeAnalyticsContact
} from "../../actions";
const moment = require("moment");
const S = {
  Container: styled.div`
    width:100%;
    min-height:800px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5%;
    padding: 1%;
    font-size: 0.8rem;
    background-color: white;
    border-radius: 3px;
    // iframe {
    //   width:100%;
    //   height:-webkit-fill-available;
    // }
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
    text-align: left;
  `
};
const ThreadMessage = props => {
  var html = props.email.email_body;
  html = html
    .replace(/\s{2,}/g, "") // <-- Replace all consecutive spaces, 2+
    .replace(/%/g, "%25") // <-- Escape %
    .replace(/&/g, "%26") // <-- Escape &
    .replace(/#/g, "%23") // <-- Escape #
    .replace(/"/g, "%22") // <-- Escape "
    .replace(/'/g, "%27"); // <-- Escape ' (to be 100% safe)
  var dataURI = "data:text/html;charset=UTF-8," + html;

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
  function showDate() {
    let formatDate;
    if (props.email.date.includes("T") || props.email.date.includes("-")) {
      formatDate = new Date(props.email.date);
    } else {
      formatDate = new Date(Number(props.email.date));
    }

    console.log("formatDate", formatDate);
    let emailDateYear = moment(formatDate).format("YYYY");
    let currentYear = moment().format("YYYY");
    if (emailDateYear === currentYear) {
      return moment(formatDate).format("MMM Do");
    } else {
      return moment(formatDate).format("MMM Do YYYY");
    }
  }
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
      {/* <IframeResizer
        log
        src={dataURI}
        style={{ width: "1px", minWidth: "100%" }}
      /> */}
      {/* <iframe src={dataURI} width="100%" height="100%" ></iframe> */}
      <iframe src={dataURI} width="100%" ></iframe>
      
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
