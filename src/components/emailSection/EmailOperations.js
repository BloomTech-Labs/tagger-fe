import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faReply, faReplyAll, faTrashAlt, faShare} from "@fortawesome/free-solid-svg-icons";

const EmailOperations = props => {

  const setOperation = (operation) => {
    props.setOperation({
      isHidden:false,
      messageType: operation
    })
  }
 
    return (
        <>
        <FontAwesomeIcon 
            icon={faReply}
            onClick={() => {
              setOperation('reply')
            }} 
        />
        <FontAwesomeIcon 
            icon={faReplyAll}
            onClick={() => {
              setOperation('replyall')
            }}
        />
        <FontAwesomeIcon 
            icon={faShare}
            onClick={() => {
              setOperation('forward')
            }}
        />  
        <FontAwesomeIcon 
            icon={faTrashAlt}
            onClick={() => {
              //setReplyIsHidden(false);
              // todo: need a delete email function that moves the email from emails array in imap to a deleted array so that it lives inside of "trash" before permanently deleting
            }}
        />
        </>
    )
}

export default EmailOperations; 