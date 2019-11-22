import React, { useState, useEffect } from 'react';
import he from 'he';
import { getContactLatestSnippet } from "../../../api";

const ContactCard = ({ contact, handleContactSearch }) => {
    const [snippet, setSnippet] = useState('');

    useEffect(() => {
        getContactLatestSnippet(`from:${contact.emailAddresses[0].value}`)
            .then(res => {
                res && setSnippet(he.decode(res));
            });
    }, [])

    return (
        <div
            key={contact.etag}
            className="user-card"
            onClick={() => handleContactSearch(contact.emailAddresses[0].value)}
        >
            <div className="user-text-container">
                <h4>{contact.names[0].displayName}</h4>
                <p>{snippet || "No messages were found."}</p>
            </div>
        </div>
    )
}

export default ContactCard;