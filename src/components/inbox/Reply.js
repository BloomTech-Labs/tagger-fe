import React, { useState } from "react";

import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";

import { sendEmail } from "../../actions/composerActions";
import MessageType from "./MessageType";
const S = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 95%;
        background-color: white;
        border-radius: 15px;
        padding: 0% 3%;
        box-sizing: border-box;
        box-shadow: 0 0 9px 1px #00000059;
    `,
    // Header: styled.div`
    //     display: flex;
    //     justify-content: space-between;
    //     border: 1px;
    //     width: 99.8%;
    //     height: 12%;
    //     border: 1px solid #dadada;
    // `,
    // HeaderText: styled.p`
    //     font-size: 1.5em;
    //     margin-left: 1.5%;
    // `,
    Input: styled.input`
        width: 70%;
        // margin-left: 2%;
        border-radius: 2px;
    `,
    Form: styled.form`
        width: 100%;
    `,
    LabelsContainer: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        label {
            width: 100%;
            display: flex;
            padding-top: 7px;
            padding-bottom: 5px;
            span {
                width: 65px;
                margin-left: 5%;
            }
        }
    `,
    TextBox: styled.textarea`
        width: 100%;
        height: 35vh;
        border-color: #cccccc;
    `,
    Footer: styled.footer`
        display: flex;
        align-items: center;
        width: 99.8%;
        height: 80px;
        justify-content: flex-end;
    `,
    Send: styled.button`
        border-radius: 5px;
        width: 8vw;
        height: 40px;
        font-size: 1.1rem;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        :hover {
            color: #007bff;
            background-color: #e6e7e8;
        }
        :active {
            background: #b8bac1;
            -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
            -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
            box-shadow: inset 0px 0px 5px #c1c1c1;
            outline: none;
        }
    `,

    Cancel: styled.button`
        border-radius: 5px;
        width: 8vw;
        height: 40px;
        font-size: 1.1rem;
        background-color: white;
        color: #007bff;
        cursor: pointer;
        :hover {
            color: white;
            background-color: #007bff;
        }
        :active {
            background: #b8bac1;
            -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
            -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
            box-shadow: inset 0px 0px 5px #c1c1c1;
            outline: none;
        }
    `
};

const Reply = (props) => {
    const [email, setEmail] = useState({
        service: "gmail",
        host: "smtp.gmail.com",
        port: "465",
        userEmail: props.emailAddress,
        receiver: props.threadContactEmailAddress,
        subject: ``,
        body: ""
    });

    const handleChange = (e) => {
        let value = e.target.value;
        setEmail({
            ...email,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // props.sendEmail(emailInfo);
        props.toggleIsReplying();
        console.log("REPLYING", email);
        props.sendEmail(email);
    };

    return (
        <S.Container>
            {/* <S.Header>
                <S.HeaderText>Replying To: {props.threadContactEmailAddress}</S.HeaderText>
            </S.Header> */}
            <S.Form onSubmit={(e) => handleSubmit(e)}>
                <MessageType
                    responseType={props.responseType}
                    setResponseType={props.setResponseType}
                />
                <S.LabelsContainer>
                    <label>
                        <span>TO:</span>

                        <S.Input />
                    </label>
                    <label>
                        <span>CC:</span>

                        <S.Input />
                    </label>
                    <label>
                        <span>Bcc:</span>

                        <S.Input />
                    </label>
                    <label>
                        <span>Subject:</span>

                        <S.Input
                            type="text"
                            name="subject"
                            id="subject"
                            value={email.subject}
                            onChange={handleChange}
                        />
                    </label>
                </S.LabelsContainer>
            </S.Form>
            <S.TextBox
                type="text"
                name="body"
                id="body"
                value={email.body}
                onChange={handleChange}
            />
            <S.Footer>
                <S.Cancel onClick={props.toggleIsReplying}>Cancel</S.Cancel>
                <S.Send onClick={handleSubmit} type="submit">
                    Send
                </S.Send>
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
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Reply);
