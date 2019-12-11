import React, { useState, useEffect } from "react";

import { getMessage } from "../../../../api/";

const ThreadMessage = (props) => {
    const [emailBody, setEmailBody] = useState();

    const iframeReff = React.createRef();
    
    console.log(iframeReff);

    useEffect(() => {
        const messageId = props.id;
        getMessage(messageId).then(res => setEmailBody(res.body));
    }, []);

    useEffect(() => {
        if (iframeReff.current) {
            const { body } = iframeReff.current.contentWindow.document;
            body.style.margin = "0px";
            body.style.fontFamily = "Arial, Helvetica, sans-serif";
            body.style.fontSize = "13px";
            body.innerHTML = emailBody;
        }
    }, [emailBody]);

    return (
        <React.Fragment>
            <iframe
                ref={iframeReff}
                title="Thread message"
                id={props.id}
                style={{
                    display: "block"
                }}
            />
        </React.Fragment>
    )
}

export default ThreadMessage;

