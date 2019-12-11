import React, { useState, useEffect } from 'react';
import he from 'he';
import { getContactLatestSnippet } from "../../../api";

const ContactCard = ({ contact, handleContactSearch, searchterm, history }) => {
    const [snippet, setSnippet] = useState('');

    useEffect(() => {
        try {
        getContactLatestSnippet(`from:${contact.emailAddresses ? contact.emailAddresses[0].value : contact.names[0].displayName}`)
            .then(res => {
                res && setSnippet(he.decode(res));
            }) } catch  (err)   {
                //Console log the contacts that have no email address listed. Right now we don't have a way to search contacts by anything other than their email address.
                // console.log(err);
                // setSnippet("No search results available.")
            };
            //Added 'contact.emailAddresses' to the dependency array on line 19. Should update this component every time a contact's email addresses change...but remove this if there's an error.
    }, [contact])

    const handleSearch = () => {

        history.push('/inbox');

        searchterm({ name: contact.names[0].displayName, 
            email: (contact.emailAddresses ? contact.emailAddresses[0].value : "none")})

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
                <div className="user-card-snippet">{snippet 
                // ||  "No messages were found."
                }</div>
            </div>
        </div>
    )
}

export default ContactCard;