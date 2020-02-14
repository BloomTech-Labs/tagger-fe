import React, { useState } from "react";

import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { sendEmail } from "../../actions/composerActions";

const S = {
  Container: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    width: 100%;
    height: 35%;
    border: 1px solid red;
  `,
  Header: styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 20%;
    border: 1px solid black;
  `,
  SendButton: styled.button`
    border: 1px solid red;
    margin-top: 0.5%;
    margin-right: 2%;
    width: 5%;
    height: 80%;
  `,

  Input: styled.textarea`
    width: 100%;
    height: 30vh;
  `
};

const Reply = props => {
  const [email, setEmail] = useState({
    service: "gmail",
    host: "smtp.gmail.com",
    port: "465",
    userEmail: props.emailAddress,
    receiver: props.threadContactEmailAddress,
    subject: `Reply to: ${props.threadContactEmailAddress}`,
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

  return (
    <form onSubmit={handleSubmit}>
      <S.Container>
        <S.Header>
          <S.SendButton type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </S.SendButton>
        </S.Header>
        <S.Input
          type="text"
          name="body"
          id="body"
          value={email.body}
          onChange={handleChange}
        ></S.Input>
      </S.Container>
    </form>
  );
};
const mapStateToProps = ({ imap, user, inbox }) => ({
  emailAddress: user.emailAddress
});
const mapDispatchToProps = {
  sendEmail
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Reply);
