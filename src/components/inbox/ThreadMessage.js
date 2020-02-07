import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";


// import {  } from "../../actions";

const S = {
    Container: styled.div`
        border: solid red 2px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: .5%;
        padding: 1%;
        font-size: .8rem;
    `,
    ContactHeader: styled.div`
        display: flex;
        justify-content: space-between;
        height: 40px;
        border: solid black 1px;
        box-sizing: border-box;
        width: 100%;
        align-items: center;
    `,
    ContactInfo: styled.div`
        width: 40%;
        height: 100%;
        border: solid black 1px;
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
        border: solid black 1px;
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
    Subject: styled.h2`
    `,
    Message: styled.article`
        text-align: left;
    
    `
}

const ThreadMessage = (props) => {


    return (
        <S.Container>
            <S.ContactHeader>
                <S.ContactInfo>
                    <S.Avatar />
                    <h3>{props.email.fromName}</h3>
                </S.ContactInfo>
                <S.MessageActions>
                    <button />
                    <button />
                    <button />
                </S.MessageActions>
            </S.ContactHeader>        
            
        <S.Subject>{props.email.subject}</S.Subject>
        <S.Message>{props.email.text}</S.Message>

        </S.Container>
    )

}

const mapStateToProps = ({ imap, user, inbox }) => ({

});
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {

      },
      dispatch
    );
  
  export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
  )(ThreadMessage);
  