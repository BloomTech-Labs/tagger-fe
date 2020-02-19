import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import blackCircle from "../../images/pngguru.com.png";

import { changeIsDisplayingAnalytics } from "../../actions";

const S = {
  Container: styled.div`
    width: 30%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      align-self: flex-end;
    }

    hr {
      width: 90%;
    }
  `,
  Avatar: styled.img`
    width: 60%;
    border-radius: 50%;
  `,
  Graph: styled.ul`
    width: 90%;
    box-sizing: border-box;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;

    li {
      margin: 0px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 8%;

      h6 {
        margin: 0px;
        margin-bottom: 5px;
      }

      div {
        background-color: #2f86ff;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 0px 15px 15px 0px;
        padding: 2px;

        span {
          color: white;
          margin-left: 5px;
        }
      }
    }
    li:nth-last-child(1) {
      margin-bottom: 0px;
    }
  `,
  LastInteraction: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin-top: 10%;
    span {
    }
  `
};

const AnalyticsBar = props => {
  const closeAnalytics = () => {
    props.changeIsDisplayingAnalytics(false);
  };
  console.log("Emails", props.emails);

  const totalEmails = props.emails.filter(
    email =>
      email.from.toLowerCase() ===
      props.analyticsContact.emailAddress[0].value.toLowerCase()
  );
  console.log("Total Emails", totalEmails);

  console.log("analytics contact", props.analyticsContact);
  return (
    <S.Container>
     
      <button onClick={() => closeAnalytics()}>X</button>

      <S.Avatar
        src={
          props.analyticsContact.coverPhoto
            ? props.analyticsContact.coverPhoto
            : blackCircle
        }
      />
      <h2>{props.analyticsContact.name}</h2>
      {props.analyticsContact.emailAddress.map(email => {
        return <h5>{email.value}</h5>;
      })}
      
      <hr />
      <S.Graph>
        {/* <li>
          <h6>Total messages</h6>
          <div>
            <span>3</span>
          </div>
        </li>

        <li>
          <h6>Sent messages</h6>
          <div>
            <span>3</span>
          </div>
        </li> */}

        <li>
          <h6>Received messages</h6>
          <div>
            <span>{totalEmails.length}</span>
          </div>
        </li>
      </S.Graph>
      {/* <S.LastInteraction>
        <span>Last interaction:</span>
        <span>2 hours ago</span>
      </S.LastInteraction> */}
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user, inbox, contacts }) => ({
  analyticsContact: inbox.analyticsContact,
  contacts: contacts.contacts,
  emails: imap.emails
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeIsDisplayingAnalytics
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AnalyticsBar);


