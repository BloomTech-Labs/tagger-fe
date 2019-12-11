import React, { useState, useEffect } from "react";

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

    console.log(props.subject);

    return (
        <React.Fragment>
            <div className="thread-message-container">
                <h3>{props.subject}</h3>
                <iframe
                    ref={iframeRef}
                    title="Thread message"
                    id={props.id}
                    style={{
                        display: "block",
                        height: "25vh",
                        width: "100%",
                        border: "none",
                        margin: "auto"
                    }}
                />
            </div>
        </React.Fragment>
    )
}

export default ThreadMessage;

