import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import ThreadMessage from "./ThreadMessage";

const ThreadContent = (props) => {

    return (
        <PerfectScrollbar className="container-fluid no-gutters px-0 thread-message-list">
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
        </PerfectScrollbar>
    )
}

export default ThreadContent;