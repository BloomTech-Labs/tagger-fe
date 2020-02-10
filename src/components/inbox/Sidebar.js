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

import {changeIsComposing} from "../../actions/composerActions"
import ComposeComponent from "../compose/Compose"
const S = {
  ModalContainer:styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display:flex;
  justify-content: center;
  align-items:center;
  `,


  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh-64px);
    height: 100vh;
    width: 230px;
    border: 1px solid #cccccc;
  `,
  Button: styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    margin: 20px 20px 20px 60px;
    border: 1px solid blue;
    height: 35px;
    color: white;
    background-color: #2f86ff;
    border-radius: 6px;
    position: absolute;
  `,
  Compose: styled.p`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
  `,
  FolderContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20%;
  `,

  Folder: styled.div`
    margin-top: 10%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    font-size: 1rem;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.2px;
    color: #454545;
    width: 60px;
  `,
  Divider: styled.div`
    position: absolute;
    border: 1 px solid #cccccc;
    width: 141px;
    height: 1px;
  `,

  TagContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5%;
    border-top: ;
  `,
  Tags: styled.p`
    font-size: 0.9rem;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    line-height: 18px;
    letter-spacing: 0.2px;
    color: #383838;
    width: 41px;
  `
};

const Sidebar = props => {
  
const toggleIsComposing = (e) => {
  e.preventDefault()
  props.changeIsComposing(!props.isComposing)
}

  return (
    
   
    <S.Container>

    {props.isComposing ? <S.ModalContainer><ComposeComponent /></S.ModalContainer>: null}
      <S.Button>
        <S.Compose onClick={toggleIsComposing}>+ Compose</S.Compose>
      </S.Button>
      <S.FolderContainer>
        <S.Folder>
          <FontAwesomeIcon icon={faInbox} />
          Inbox
        </S.Folder>
        <S.Folder>
          <FontAwesomeIcon icon={faFile} />
          Drafts
        </S.Folder>
        <S.Folder>
          <FontAwesomeIcon icon={faPaperPlane} />
          Sent
        </S.Folder>
        <S.Folder>
          <FontAwesomeIcon icon={faTrash} />
          Trash
        </S.Folder>
        <S.Folder>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          Spam
        </S.Folder>
      </S.FolderContainer>
      <S.Divider></S.Divider>
      <S.TagContainer>
        <S.Folder>
          <FontAwesomeIcon icon={faTags} />
          Tags
        </S.Folder>
        <S.Tags>Social</S.Tags>
        <S.Tags>Finance</S.Tags>
        <S.Tags>Entertainment</S.Tags>
        <S.Tags>Productivity</S.Tags>
        <S.Tags>Events</S.Tags>
        <S.Tags>Shopping</S.Tags>
        <S.Tags>Travel</S.Tags>
        <S.Tags>Other</S.Tags>
      </S.TagContainer>
    </S.Container>
   
  );
};

const mapStateToProps = ({ imap, user,composer }) => ({
  isComposing: composer.isComposing
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeIsComposing
}, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);
