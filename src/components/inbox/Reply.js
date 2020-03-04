import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendEmail } from "../../actions/composerActions";
import MessageType from "./MessageType";
import ContactButton from "./ContactButton";

// Styling for the reply component
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
    Input: styled.input`
        width: 98%;
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
            .ContactButton {
                width: 100%;
                height: fit-content;
                display: flex;
                flex-wrap: wrap;
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
            text-shadow: 0px 1px #0000004f;
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
            text-shadow: 0px 2px black;
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
    // initial state for the email object that gets sent using nodemailer on the backend
    const initialState = {
        service: "gmail",
        host: "smtp.gmail.com",
        port: "465",
        userEmail: props.emailAddress,
        token: props.token,
        receiver: "",
        CC: "",
        BCC: "",
        subject: "",
        body: ""
    };
    const [email, setEmail] = useState(initialState);
    const [addresses, setAddresses] = useState([]);
    const [ccAddresses, setCcAddresses] = useState([]);
    const [bccAdresses, setBccAdresses] = useState([]);
    // useEffect to change who you reply to depending on whether you hit reply, reply all, or forward
    useEffect(() => {
        if (props.responseType === "Reply") {
            setAddresses([props.email.from]);
        } else if (props.responseType === "Forward") {
            setAddresses([]);
        } else if (props.responseType === "Reply-All") {
            let array = props.email.to.map(e => e);
            setAddresses(array);
        }
        // todo ADD CC and BCC updates here.   must also be split by (", ") before being pushed to respective arrays
    }, [props.responseType]);
    const removeAddress = (index) => {
        const currentAddressList = [...addresses];
        currentAddressList.splice(index, 1);
        setAddresses([...currentAddressList]);
    };
    function extractEmailAdresses(string, name) {
        let obj = {
            newString: "",
            receiver: [],
            CC: [],
            BCC: []
        };
        const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
        var match = string.match(regex);
        match === null ? (obj[`${name}`] = []) : (obj[`${name}`] = match);
        obj.newString = string.replace(regex, "");
        // console.log(obj);
        return obj;
    }
    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        const keyValue = e.nativeEvent.data;
        if (keyValue === " " && e.target.name !== "subject" && e.target.name !== "body") {
            const { newString, receiver, CC, BCC } = extractEmailAdresses(value, name);
            setAddresses([...addresses, ...receiver]);
            setCcAddresses([...ccAddresses, ...CC]);
            setBccAdresses([...bccAdresses, ...BCC]);
            setEmail({
                ...email,
                receiver: newString
            });
        } else {
            setEmail({
                ...email,
                [e.target.name]: value
            });
        }
    };
    const handleCancel = () => {
        setEmail(initialState);
        props.setReplyIsHidden(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let finalReply = {
            ...email,
            receiver: addresses.join(", "),
            CC: ccAddresses.join(", "),
            BCC: bccAdresses.join(", ")
        };
        props.setReplyIsHidden(true);
        props.sendEmail(finalReply);
        setEmail(initialState);
    };
    return (
        <S.Container>
            <S.Form onSubmit={(e) => handleSubmit(e)}>
                <MessageType
                    responseType={props.responseType}
                    setResponseType={props.setResponseType}
                />
                <S.LabelsContainer>
                    <label>
                        <span>TO:</span>
                        <div className="ContactButton">
                            {addresses.map((address, index) => {
                                return (
                                    <ContactButton
                                        key={`ContactButton${index}`}
                                        text={address}
                                        index={index}
                                        remove={removeAddress}
                                    />
                                );
                            })}
                            <S.Input
                                type="text"
                                name="receiver"
                                value={email.receiver}
                                onChangeCapture={handleChange}
                            />
                        </div>
                    </label>
                    <label>
                        <span>CC:</span>

                        <S.Input
                            type="text"
                            name="CC"
                            value={email.CC}
                            onChangeCapture={handleChange}
                        />
                    </label>
                    <label>
                        <span>Bcc:</span>
                        <S.Input
                            type="text"
                            name="BCC"
                            value={email.BCC}
                            onChangeCapture={handleChange}
                        />
                    </label>
                    <label>
                        <span>Subject:</span>
                        <S.Input
                            type="text"
                            name="subject"
                            id="subject"
                            value={email.subject}
                            onChangeCapture={handleChange}
                        />
                    </label>
                </S.LabelsContainer>
            </S.Form>
            <S.TextBox
                type="text"
                name="body"
                id="body"
                value={email.body}
                onChangeCapture={handleChange}
            />
            <S.Footer>
                <S.Cancel onClick={handleCancel}>Cancel</S.Cancel>
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
