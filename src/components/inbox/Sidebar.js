import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faFile,
  faPaperPlane,
  faTrash,
  faTags,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import Inbox from "./Inbox";

const S = {
  Container: styled.div`
    flex-direction: row;
    // height: calc(100vh-64px);
    height: 100%;
    width: 230px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-right: solid #e0e0e0 1px;

    hr {
      width: 90%;
      margin: 15% auto;
    }

    ul {
      padding: 0px;
      list-style-type: none;
      margin: 0px;
      display: flex;
      flex-direction: column;
      margin-left: 15%;

      li {
        display: flex;
        font-size: 1rem;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        color: #454545;
        align-items: center;
        margin-bottom: 3vh;
        
        div {
          width: 30px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      li:nth-last-child(1) {
        margin: 0px;
      }
    }
  };
  `,
  Button: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 35px;
    color: white;
    background-color: #2f86ff;
    border-radius: 6px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    margin: 8% 0%;
    margin-left: calc((100% - 110px) / 2)
  `,

  FontAwesomeIcon:styled(props => <FontAwesomeIcon {...props} />)`
    margin-right: 5px;
    color: grey;
    
  `,

}




const Sidebar = props => {
  return (
    <S.Container>
      <S.Button>
        + Compose
      </S.Button>

      <ul>
        <li>
          <div><S.FontAwesomeIcon icon={faInbox} /></div>
          <span>Inbox</span>
        </li>
        <li>
          <div><S.FontAwesomeIcon icon={faFile} /></div>
          <span>Drafts</span>
        </li>
        <li>
          <div><S.FontAwesomeIcon icon={faPaperPlane} /></div>
          <span>Sent</span>
        </li>
        <li>
          <div><S.FontAwesomeIcon icon={faTrash} /></div>
          <span>Trash</span>
        </li>
        <li>
          <div><S.FontAwesomeIcon icon={faExclamationTriangle} /></div>
          <span>Spam</span>
        </li>
        <li>
          <div><S.FontAwesomeIcon icon={faTags} /></div>
          Tags
        </li>
      </ul>


      <hr />

      <ul>
        <li>Social</li>
        <li>Finance</li>
        <li>Entertainment</li>
        <li>Productivity</li>
        <li>Events</li>
        <li>Shopping</li>
        <li>Travel</li>
        <li>Other</li>
      </ul>
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);
