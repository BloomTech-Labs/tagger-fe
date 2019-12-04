import React, { useState, useEffect } from 'react';
import he from 'he';
import { getContactLatestSnippet } from "../../../api";

const ContactCard = ({ contact, handleContactSearch, searchterm }) => {
    const [snippet, setSnippet] = useState('');

    useEffect(() => {
        try {
        getContactLatestSnippet(`from:${contact.emailAddresses[0].value}`)
            .then(res => {
                res && setSnippet(he.decode(res));
            }) } catch  (err) {  {
                //Console log the contacts that have no email address listed. Right now we don't have a way to search contacts by anything other than their email address.
                // console.log(err);
                // setSnippet("No search results available.")
            }};
    }, [])

    const handleSearch = () => {
        searchterm(contact.names[0].displayName)
        handleContactSearch(contact.names[0].displayName);
    }

    return (
        <div
            key={contact.etag}
            className="user-card"
            onClick={handleSearch}
            // onClick={() => handleContactSearch(contact.emailAddresses[0].value)}
        >
            <div className="user-text-container">
                <h4>{contact.names[0].displayName}</h4>
                <p>{snippet 
                // ||  "No messages were found."
                    }</p>
            </div>
        </div>
    )
}

export default ContactCard;