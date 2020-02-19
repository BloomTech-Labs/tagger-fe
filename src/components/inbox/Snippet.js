import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";


import {
  changeThreadContact,
  changeIsDisplayingThread,
  changeAnalyticsContact,
  changeIsDisplayingAnalytics
} from "../../actions";

const moment = require("moment");

const S = {
  Container: styled.div`
    width: 100%;
    height: ${props => props.heightInPx}px;
    box-sizing: border-box;
    font-size: 0.8rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3px 1%;
    border-bottom: solid #e0e0e0 1px;
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
    }

    div {
      width: calc(100% - 30px);
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  Avatar: styled.img`
    width: 30px;
    height: 30px;
    background-color: black;
    border-radius: 15px;
    margin: 0px;
    margin-right: 1%;
  `,
  Subject: styled.div`
    font-weight: 700;
  `,
  Message: styled.div`
    width: 100%;
    text-align: left;
    overflow: hidden;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-word;
    text-align: left;
    text-overflow: ellipsis;
  `
};

const Snippet = props => {
 
  const setThreadContact = () => {
    // Sets contact in thread section to be the one from this snippet
    // let i;
    // for (i = 0; i < props.contacts.length; i++) {
    //   if (props.contacts[i].email === props.email.from) {
    //     props.changeThreadContact(props.contacts[i].email);
    //     if (!props.isDisplayingThread) {
    //       props.changeIsDisplayingThread(true);
    //     }
    //   } else {
    //     props.changeThreadContact(props.email.from);
    //     if (!props.isDisplayingThread) {
    //       props.changeIsDisplayingThread(true);
    //     }
    //   }
    // }
    const emailObj = props.email;
    props.changeThreadContact(emailObj);

  };

  function showDate() {
    let formatDate;
    if (props.email.date.includes("T") || props.email.date.includes("-")){
      formatDate = new Date(props.email.date)
    } else{
      formatDate = new Date(Number(props.email.date))
    }

    console.log("formatDate", formatDate)
    let emailDateYear = moment(formatDate).format("YYYY");
    let currentYear = moment().format("YYYY");
    if (emailDateYear === currentYear) {
        return moment(formatDate).format("MMM Do");
    } else {
        return moment(formatDate).format("MMM Do YYYY");
    }
  }

  const setAnalyticsContact = email => {
    
    console.log("EMAIL", email)
    

    const filter = props.contacts.filter(c => c.emailAddresses[0].value.toLowerCase() === email.from.toLowerCase())
    console.log("FILTER", filter)
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
        emailAddress: [{value: email.from}],
        name: email.name
      };
      // Sets contact to be displayed in analytics sidebar
      props.changeAnalyticsContact(contact);
      props.changeIsDisplayingAnalytics(true);
    }
    // console.log("filter", filter)
  };

  return (
    <S.Container
      heightInPx={
        props.isDisplayingThread ? (props.isDisplayingAnalytics ? 100 : 80) : 75
      }
      onClick={() => setThreadContact()}
    >
      {/* <h3>{props.email.fromName}</h3>
            <span>{props.email.subject}</span>
            <span>{props.email.text}</span>
            <div>{props.email.fromEmailAddress}</div> */}
      <S.SnipHeader>
        <S.Avatar onClick={() => setAnalyticsContact(props.email)} />
        <div>
          <h3 onClick={() => setAnalyticsContact(props.email)}>
            {props.email.name 
            ? props.email.name 
            : props.email.from}
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
  contacts: contacts.contacts
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeThreadContact,
      changeIsDisplayingThread,
      changeAnalyticsContact,
      changeIsDisplayingAnalytics
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Snippet);
