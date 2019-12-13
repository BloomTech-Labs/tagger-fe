import React, { useState, useEffect } from "react";

import moment from "moment";

import ContactMessageTags from "../../../contact-messages/contact-message-row/ContactMessageTags";

import { getMessage } from "../../../../api/";

import '../thread-content/threadMessage.scss';

const ThreadMessage = (props) => {

    const [emailBody, setEmailBody] = useState();

    const iframeRef = React.createRef();

    useEffect(() => {
        const messageId = props.id;
        getMessage(messageId).then(res => setEmailBody(res.body));
    }, []);

    useEffect(() => {
        if (iframeRef.current) {
            const { body } = iframeRef.current.contentWindow.document;
            body.style.margin = "0px";
            body.style.fontFamily = "Arial, Helvetica, sans-serif";
            body.style.fontSize = "13px";
            body.innerHTML = emailBody;
        }
    }, [emailBody]);

    return (
        <React.Fragment>
            <div className="thread-message-container">
                <div className="thread-message-from">
                    <h5>{props.from}</h5>
                </div>
                <div className="thread-message-header">
                    <h4>{props.subject}</h4>
                    <h6>{moment(Number(props.timestamp)).fromNow()}</h6>
                </div>
                <ContactMessageTags labelIds={props.labelIds} />
                <iframe
                    ref={iframeRef}
                    title="Thread message"
                    id={props.id}
                    style={{
                        display: "block",
                        height: "25vh",
                        width: "100%",
                        border: "none",
                        margin: "2rem 0 0 0"
                    }}
                />
            </div>
        </React.Fragment>
    )
}

export default ThreadMessage;

