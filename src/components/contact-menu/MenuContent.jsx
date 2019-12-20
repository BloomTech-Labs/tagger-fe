import React, { useState, useEffect } from "react";

import ProgressBar from 'react-bootstrap/ProgressBar';

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
    // console.log("Changes: ", latestMessageId, numReceivedMessages, numSentMessages, lastInteraction);

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
            <div className="messages-stats">
                <p>Total Messages</p>
                <ProgressBar now={100} label={numReceivedMessages && numSentMessages ? numReceivedMessages + numSentMessages : numReceivedMessages || numSentMessages} />
            </div>

            <div className="messages-stats">
                <p>Sent Messages</p>
                <ProgressBar now={(numSentMessages / (numSentMessages + numReceivedMessages)) * 100} label={numSentMessages} />
            </div>

            <div className="messages-stats">
                <p>Received Messages</p>
                <ProgressBar now={(numReceivedMessages / (numSentMessages + numReceivedMessages)) * 100} label={numReceivedMessages} />
            </div>

            <div className="last-interaction">
                <p>Last Interaction:</p>
                <p>{lastInteraction || "No interactions recorded."}</p>
            </div>
        </div>
    )
}

export default MenuContent;