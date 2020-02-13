import React, { useState } from "react";

import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";


import { sendEmail } from "../../actions/composerActions";

const S = {
  Container: styled.form`
   border: 1px solid black;
   height: 100px; //get rid of height later
   width: 100%;
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
     
    <S.Container onSubmit={handleSubmit}>
      
    </S.Container>
    
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
