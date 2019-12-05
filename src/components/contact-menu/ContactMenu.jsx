import React, { useState, useEffect } from 'react';
import "./contact-menu.scss"

const ContactMenu = (props) => {
    const [receivedMessages, setReceivedMessages] = useState();
    const [sentMessages, setSentMessages] = useState();
    const [latestMessageId, setLatestMessageId] = useState();

    useEffect(() => {
        getContactMessages(`from:${props.searchterm.email}`)
            .then(res => setReceivedMessages(res.result.resultSizeEstimate));
        getContactMessages(`to:${props.searchterm.email}`)
            .then(res => setSentMessages(res.result.resultSizeEstimate));
        getContactLatestMessageId(`from: ${props.searchterm.email}`)
            .then(res => setLatestMessageId(res.result.messages && res.result.messages[0].id));
    }, [props])

    console.log(latestMessageId);

    const getContactMessages = async (q) => {
        return await window.gapi.client.gmail.users.messages
          .list({
            userId: "me",
            q,
          });
    }

    const getContactLatestMessageId = async (q) => {
        return await window.gapi.client.gmail.users.messages
          .list({
            userId: "me",
            q,
            maxResults: 1
          });
    }

    const contactMenu = () => {
        return (
            <div className="contact-menu-container">
                <div className="banner">
                    <img alt={`Headshot of ${props.searchterm.name}`}/>
                    <h2>{props.searchterm.name}</h2>
                </div>
    
                <div className="menu-content">
                    <h4>Total Messages</h4>
                    <p>{receivedMessages + sentMessages}</p>
    
                    <h4>Sent Messages</h4>
                    <p>{sentMessages}</p>
    
                    <h4>Received Messages</h4>
                    <p>{receivedMessages}</p>
    
                    <h4>Last Interaction</h4>
                    <p>2 months ago</p>
                </div>
            </div>
        );
    }

    if (props.searchterm) {
        return contactMenu();
    } else {
        return <div></div>;
    }
}

export default ContactMenu;