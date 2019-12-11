import React, { useState, useEffect } from "react";

import moment from "moment";

const MenuContent = props => {
    const [latestMessageId, setLatestMessageId] = useState('');
    const [numReceivedMessages, setNumReceivedMessages] = useState(0);
    const [numSentMessages, setNumSentMessages] = useState(0);
    const [lastInteraction, setLastInteraction] = useState('Calculating...');

    useEffect(() => {
        getReceivedMessages( (!props.email === "none") ? `from:${props.email}` : `from:${props.name}`);
        getSentMessages(`to:${props.email}`);
        getLastInteractionData(latestMessageId);
    }, [props])

    const getReceivedMessages = async (q) => {
        return await window.gapi.client.gmail.users.messages
            .list({
                userId: "me",
                q
            })
            .then(res => {
                setLatestMessageId(res.result.messages[0].id);
                setNumReceivedMessages(res.result.resultSizeEstimate);
            });
    }

    const getSentMessages = async (q) => {
        return await window.gapi.client.gmail.users.messages
            .list({
                userId: "me",
                q
            })
            .then(res => {
                setNumSentMessages(res.result.resultSizeEstimate);
            })
    }

    const getLastInteractionData = async id => {
        return await window.gapi.client.gmail.users.messages
            .get({
                userId: "me",
                id: id
            })
            .then(res => {
                const date = res.result.internalDate;
                setLastInteraction(moment(Number(date)).fromNow());
            })
    }

    return (
        <div className="menu-content">
            <h4>Total Messages</h4>
            <p>{numReceivedMessages && numSentMessages ? numReceivedMessages + numSentMessages : numReceivedMessages || numSentMessages}</p>

            <h4>Sent Messages</h4>
            <p>{numSentMessages}</p>

            <h4>Received Messages</h4>
            <p>{numReceivedMessages}</p>

            <h4>Last Interaction</h4>
            <p>{lastInteraction}</p>
        </div>
    )
}

export default MenuContent;