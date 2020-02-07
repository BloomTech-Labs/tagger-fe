import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";

const S = {
  Container: styled.div`
    display: inline-block;
    flex-direction: row;
    position: absolute;
    // height: calc(100vh-64px);
    height: 954px;
    width: 230px;
    border: 1px solid red;
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
  P: styled.p`
    font-size: 1rem;
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    line-height: 20px;
    letter-spacing: 0.2px;
    color: #454545;
    width: 41px;
  `,
  Divider: styled.div`
    position: absolute;
    border: 1 px solid #cccccc;
    width: 141px;
    height: 1px;
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
  return (
    <S.Container>
      <S.Button>
        <S.Compose>+ Compose</S.Compose>
        <S.P>Inbox</S.P>
        <S.P>Drafts</S.P>
        <S.P>Sent</S.P>
        <S.P>Trash</S.P>
        <S.P>Spam</S.P>
        <S.Divider></S.Divider>
        <S.P>Tags</S.P>
        <S.Tags>Social</S.Tags>
        <S.Tags>Finance</S.Tags>
        <S.Tags>Entertainment</S.Tags>
        <S.Tags>Productivity</S.Tags>
        <S.Tags>Events</S.Tags>
        <S.Tags>Shopping</S.Tags>
        <S.Tags>Travel</S.Tags>
        <S.Tags>Other</S.Tags>
      </S.Button>
    </S.Container>
  );
};

const mapStateToProps = ({ imap, user }) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);
