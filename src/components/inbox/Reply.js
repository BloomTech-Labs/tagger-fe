import React, { useState } from "react";

import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";


import { sendEmail } from "../../actions/composerActions";

const S = {
  Container: styled.form`
   width: 100%;
  `,
  Header: styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px;
  width: 99.8%;
  height: 12%;
  border: 1px solid #dadada;
`,
HeaderText: styled.p`
  font-size: 1.5em;
  margin-left: 1.5%;
`,
Input: styled.input`
    width: 70%;
    margin-left: 2%;
    border-radius: 2px;
  `,
  Form: styled.form`
    
    width: 90%;
  `,
  LabelsContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    label{
      width:100%;
      display: flex;
      padding-top: 7px;
      padding-bottom: 5px;
      span{
       width: 65px;
       margin-left: 5%;
      }
    }
    `,
    TextBox: styled.textarea`
    width: 99.4%;
    height: 35vh;
    border-color: #cccccc;
    
  `,
  Footer: styled.footer`
    display: flex;
    align-items: center;
    width: 99.8%;
    height: 12vh;
    justify-content: flex-end;
  `,
  Send: styled.button`
    margin-top: 0.8%;
    margin-left: 2%;
    border-radius: 5px;
    width: 8vw;
    height: 6vh;
    font-size: 1.5rem;
    background-color: #007bff;
    color: white;
  `
  

}



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
    <S.Container>
     <S.Header>
       <S.HeaderText>Replying To: </S.HeaderText>
       </S.Header>
       <S.Form onSubmit={handleSubmit}>
         <S.LabelsContainer>
           <label>
             <span>CC:</span>
             <S.Input
          ></S.Input>
           </label>
           <label>
            <span>Bcc:</span>
          <S.Input ></S.Input>
          </label>
          <label>
            <span>Subject:</span>
          <S.Input
            type="text"
            name="subject"
            id="subject"
            value={email.subject}
            onChange={handleChange}
          ></S.Input>
          </label>
         </S.LabelsContainer>
         <S.TextBox
            type="text"
            name="body"
            id="body"
            value={email.body}
            onChange={handleChange}
          ></S.TextBox>
       </S.Form>
       <S.Footer>
       <S.Send type="submit">Send</S.Send>
       </S.Footer>
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
