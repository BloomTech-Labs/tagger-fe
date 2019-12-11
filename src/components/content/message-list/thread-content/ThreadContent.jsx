import React from "react";

import ThreadMessage from "./ThreadMessage";

const ThreadContent = ({ thread }) => {

    return (
        <>
            {thread.map(message => {
                return (
                    <ThreadMessage key={message.id} id={message.id} />
                )
            })}
        </>
    )
}

export default ThreadContent;