import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faReply, faReplyAll, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const EmailOperations = () => {

    const setReplyIsHidden = () => {

    }

    const setResponseType = () => {
        
    }
 
    return (
        <>
        <FontAwesomeIcon 
            icon={faReply}
            onClick={() => {
              setReplyIsHidden(false);
              setResponseType("Reply");
            }} 
        />
        <FontAwesomeIcon 
            icon={faReplyAll}
            onClick={() => {
              setReplyIsHidden(false);
              setResponseType("Reply-All");
            }}
        /> 
        <FontAwesomeIcon 
            icon={faTrashAlt}
            onClick={() => {
              setReplyIsHidden(false);
              // todo: need a delete email function that moves the email from emails array in imap to a deleted array so that it lives inside of "trash" before permanently deleting
            }}
        />
        </>
    )
}

export default EmailOperations; 