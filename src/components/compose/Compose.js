import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendEmail, changeIsComposing } from "../../actions/composerActions";

// styling for the Compose module 
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
        box-shadow: 0 0 11px 4px #ada9a9;
        width: 60vw;
        // height: 80vh;
        margin-top: 10vh;
        background-color: white;
        align-items: center;
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
    HeaderCancel: styled.p`
        font-size: 1.5rem;
        margin-right: 1%;
        color: #cccccc;
    `,

    Input: styled.input`
        width: 70%;
        margin-left: 2%;
        border-radius: 2px;
    `,

    ComposeOptions: styled.div`
        border: 1px solid #cccccc;
        width: 99.8%;
        height: 8%;
        margin-top: 1.5%;
    `,
    Form: styled.form`
        width: 90%;
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
    `,
    Trash: styled.button`
        margin-top: 0.8%;
        margin-left: 2%;
        border-radius: 5px;
        width: 8vw;
        height: 6vh;
        font-size: 1.5rem;
        background-color: white;
        color: #007bff;
    `
};

const Compose = (props) => {
    // this is the state for the email object that gets sent off using nodemailer on the backend
    const [email, setEmail] = useState({
        service: "gmail",
        host: "smtp.gmail.com",
        port: "465",
        userEmail: "taggerlabs20@gmail.com",
        token:props.token,
        receiver: "",
        subject: "",
        body: "",
        cc: "",
        bcc: ""

    });
// handles the input change for the input fields
    const handleChange = (e) => {
        let value = e.target.value;
        setEmail({
            ...email,
            [e.target.name]: value
        });
    };
// invokes the sendEmail function brought in from ComposerActions.js 
    const handleSubmit = (e) => {
        e.preventDefault();
        // props.sendEmail(emailInfo);
        console.log("PROPS", props);
        console.log(email, "Email")
        props.sendEmail(email, props.token);
    };
// toggles the isComposing state to not show the composing component
    const changeIsComposing = (e) => {
        props.changeIsComposing(!props.isComposing);
    };
    return (
        <S.Container>
            <S.Compose>
                <S.Header>
                    <S.HeaderText>Compose</S.HeaderText>
                    <S.HeaderCancel onClick={changeIsComposing}>x</S.HeaderCancel>
                </S.Header>
                <S.Form onSubmit={handleSubmit}>
                    <S.LabelsContainer>
                        <label>
                            <span>To:</span>
                            <S.Input
                                type="email"
                                name="receiver"
                                id="receiver"
                                value={email.receiver}
                                onChange={handleChange}
                            ></S.Input>
                        </label>

                        <label>
                            <span>Cc:</span>
                            <S.Input
                            type="email"
                            name="cc"
                            id="cc"
                            value={email.cc}
                            onChange={handleChange}
                            ></S.Input>
                        </label>
                        <label>
                            <span>Bcc:</span>
                            <S.Input
                             type="email"
                             name="bcc"
                             id="bcc"
                             value={email.bcc}
                             onChange={handleChange}
                            ></S.Input>
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
                    <S.ComposeOptions></S.ComposeOptions>
                    <S.TextBox
                        type="text"
                        name="body"
                        id="body"
                        value={email.body}
                        onChange={handleChange}
                    ></S.TextBox>
                    <S.Footer>
                        <S.Trash onClick={changeIsComposing}>Cancel</S.Trash>
                        <S.Send type="submit">Send</S.Send>
                    </S.Footer>
                </S.Form>
            </S.Compose>
        </S.Container>
    );
};

const mapStateToProps = ({ composer }) => ({
    isComposing: composer.isComposing
});
const mapDispatchToProps = {
    sendEmail,
    changeIsComposing
};
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Compose);
