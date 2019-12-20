import React from "react";

import Scrollbar from "react-scrollbars-custom";
import ThreadMessage from "./ThreadMessage";

const ThreadContent = (props) => {

    return (
            <Scrollbar>
                {props.thread.map(message => {
                    let from = '';
                    let subject = '';
                    let timestamp = message.internalDate;
                    message.payload.headers.map(header => {
                        if (header.name === 'Subject') {
                            subject = header.value;
                        }
    
                        if (header.name === 'From') {
                            from = header.value;
                        }
                    })
    
                    return (
                        <ThreadMessage
                            key={message.id}
                            id={message.id}
                            from={from}
                            labelIds={message.labelIds}
                            subject={subject}
                            timestamp={timestamp}
                        />
                    )
                })}
            </Scrollbar>
    )
}

export default ThreadContent;