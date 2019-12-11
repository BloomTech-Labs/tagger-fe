import React, { useEffect } from "react";

import { getMessage } from "../../../../api/";

const ThreadMessage = (props) => {
    const iframeRef = React.createRef();

    useEffect(() => {
        const messageId = props.id;
        getMessage(messageId).then(res => console.log(res));
    }, []);

    return (
        <div>{props.id}</div>
    )
}

export default ThreadMessage;

