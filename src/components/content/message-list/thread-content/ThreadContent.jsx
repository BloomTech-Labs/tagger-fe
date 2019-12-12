import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import ThreadMessage from "./ThreadMessage";

const ThreadContent = (props) => {

    return (
        <PerfectScrollbar className="container-fluid no-gutters px-0 thread-message-list">
            {props.thread.map(message => {
                let subject = '';
                let timestamp = message.internalDate;
                message.payload.headers.map(header => {
                    if (header.name === 'Subject') {
                        subject = header.value;
                    }
                })

                return (
                    <ThreadMessage
                        key={message.id}
                        id={message.id}
                        labelIds={message.labelIds}
                        subject={subject}
                        timestamp={timestamp}
                    />
                )
            })}
        </PerfectScrollbar>
    )
}

export default ThreadContent;