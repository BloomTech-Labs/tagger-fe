import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import ThreadMessage from "./ThreadMessage";

const ThreadContent = (props) => {

    console.log(props);

    return (
        <PerfectScrollbar className="container-fluid no-gutters px-0 thread-message-list">
            {props.thread.map(message => {
                let subject = '';
                message.payload.headers.map(header => {
                    if (header.name === 'Subject') {
                        subject = header.value;
                    }
                })

                return (
                    <ThreadMessage
                        key={message.id}
                        id={message.id}
                        subject={subject}
                    />
                )
            })}
        </PerfectScrollbar>
    )
}

export default ThreadContent;