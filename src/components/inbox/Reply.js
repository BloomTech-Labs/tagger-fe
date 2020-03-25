import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendEmail } from "../../actions/composerActions";
import MessageType from "./MessageType";
import ContactButton from "./ContactButton";

// Styling done in layout 

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
        <div className="reply">
            <form className="reply-form" onSubmit={(e) => handleSubmit(e)}>
                <MessageType
                    responseType={props.responseType}
                    setResponseType={props.setResponseType}
                />
                <div className="label-container">
                    <label>
                        <span>TO:</span>
                        <div className="ContactButton">
                            {addresses.map((address, index) => {
                                return (
                                    <divButton
                                        key={`ContactButton${index}`}
                                        text={address}
                                        index={index}
                                        remove={removeAddress}
                                    />
                                );
                            })}
                            <input className="label-input"
                                type="text"
                                name="receiver"
                                value={email.receiver}
                                onChangeCapture={handleChange}
                            />
                        </div>
                    </label>
                    <label>
                        <span>CC:</span>

                        <input className="label-input"
                            type="text"
                            name="CC"
                            value={email.CC}
                            onChangeCapture={handleChange}
                        />
                    </label>
                    <label>
                        <span>Bcc:</span>
                        <input className="label-input"
                            type="text"
                            name="BCC"
                            value={email.BCC}
                            onChangeCapture={handleChange}
                        />
                    </label>
                    <label>
                        <span>Subject:</span>
                        <input className="label-input"
                            type="text"
                            name="subject"
                            id="subject"
                            value={email.subject}
                            onChangeCapture={handleChange}
                        />
                    </label>
                </div>
            </form>
            <textarea className="label-textarea"
                type="text"
                name="body"
                id="body"
                value={email.body}
                onChangeCapture={handleChange}
            />
            <footer className="label-footer">
                <button className="reply-cancel" onClick={handleCancel}>Cancel</button>
                <button className="reply-send" onClick={handleSubmit} type="submit">
                    Send
                </button>
            </footer>
        </div>
    );
};
const mapStateToProps = ({ imap, user, inbox }) => ({
    emailAddress: user.emailAddress
});
const mapDispatchToProps = {
    sendEmail
};
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Reply);
