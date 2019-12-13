import React, { useState, useEffect } from 'react';
import he from 'he';
import moment from 'moment';
import { getContactLatestSnippet } from "../../../api";

const ContactCard = ({ contact, handleContactSearch, searchterm, history }) => {
    const [snippet, setSnippet] = useState('');
    const [lastInteraction, setLastInteraction] = useState('Calculating...');

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

    useEffect(() => {
        getReceivedMessages(`from:${contact.emailAddresses ? contact.emailAddresses[0].value : contact.names[0].displayName}`)
            .then(res => {
                getLastInteractionData(res);
            })
    }, [contact]);

    const getReceivedMessages = async (q) => {
        return await window.gapi.client.gmail.users.messages
            .list({
                userId: "me",
                q
            })
            .then(res => {
                return res.result.messages[0].id;
            });
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
        >
            <div className="user-text-container">
                <div className="user-card-header">
                    <h4>{contact.names[0].displayName}</h4>
                    <h6>{lastInteraction || "No interactions recorded."}</h6>
                </div>
                <div className="user-card-snippet">{snippet || "No messages were found."}</div>
            </div>
        </div>
    )
}

export default ContactCard;