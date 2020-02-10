import React, { useState } from "react";

import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";

import { sendEmail, changeIsComposing } from "../../actions/composerActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid blue;
    width: 99.8vw;
    height: 99.5vh;
    
    
  `,
  Compose: styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    border: 1px solid black;
    width: 60vw;
    height: 80vh;
    margin-top: 10vh;
    background-color:white;
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    width: 99.8%;
    height: 12%;
  `,
  HeaderText: styled.p`
    font-size: 1.5em;
    margin-left: 1.5%;
  `,
  HeaderCancel: styled.p`
    font-size: 1.5rem;
    margin-right: 1%;
    color: #cccccc;
  `,

  InputText: styled.p``,

  Input: styled.input`
    width: 70%;
    margin-left: 2%;
    margin-top: 1%;
    border-radius: 2px;
  `,
  InputSpan: styled.span`
    background-color: #cccccc;
    width: 5%;
  `,
  ComposeOptions: styled.div`
    border: 1px solid #cccccc;
    width: 99.8%;
    height: 8%;
    margin-top: 1.5%;
  `,
  TextBox: styled.textarea`
    width: 99.4%;
    height: 35vh;
    border-color: #cccccc;
  `,
  Footer: styled.footer`
    display: flex;
    justify-content: space-between;
    width: 99.8%;
    height: 8vh;
  `,
  Send: styled.button`
    margin-top: 0.8%;
    margin-left: 2%;
    border-radius: 5px;
    width: 8vw;
    height: 6vh;
    font-size: 1.5rem;
    background-color: #007bff;
  `,
  Trash: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 4%;
    height: 5vh;
    margin-right: 2%;
    margin-top: 1%;
    background-color: #f8f9fa;
    border-radius: 5px;
  `
};

const Compose = props => {
  const [email, setEmail] = useState({
    service: "gmail",
    host: "smtp.gmail.com",
    port: "465",
    userEmail: "taggerlabs20@gmail.com",
    receiver: "",
    subject: "",
    body: ""
  });

  const handleChange = e => {
    let value = e.target.value;
    setEmail({
      ...email,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // props.sendEmail(emailInfo);
    console.log("PROPS", props);
    props.sendEmail(email);
  };

  const changeIsComposing = e =>{
    props.changeIsComposing(!props.isComposing)
  }
  return (
    <S.Container>
      <S.Compose>
        <S.Header>
          <S.HeaderText>Compose Message</S.HeaderText>
          <S.HeaderCancel onClick={changeIsComposing}>x</S.HeaderCancel>
        </S.Header>
        <form onSubmit={handleSubmit}>
          <S.Input
            placeholder="To:"
            type="text"
            name="receiver"
            id="receiver"
            value={email.receiver}
            onChange={handleChange}
          ></S.Input>
          <S.Input placeholder="Cc:"></S.Input>
          <S.Input placeholder="Bcc:"></S.Input>
          <S.Input
            placeholder="Subject:"
            type="text"
            name="subject"
            id="subject"
            value={email.subject}
            onChange={handleChange}
          ></S.Input>
          <S.ComposeOptions></S.ComposeOptions>
          <S.TextBox
            type="text"
            name="body"
            id="body"
            value={email.body}
            onChange={handleChange}
          ></S.TextBox>
          <S.Footer>
            <S.Send type="submit">Send</S.Send>
            <S.Trash onClick={changeIsComposing}>
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </S.Trash>
          </S.Footer>
        </form>
      </S.Compose>
    </S.Container>
  );
};

const mapStateToProps = ({ composer }) => ({
  isComposing: composer.isComposing,
  email: {
    service: composer.email.service,
    host: composer.email.host,
    port: composer.email.port,
    userEmail: composer.email.userEmail,
    receiver: composer.email.receiver,
    subject: composer.email.subject,
    body: composer.email.body
  }
});
const mapDispatchToProps = {
  sendEmail,
  changeIsComposing
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Compose);
