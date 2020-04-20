import React from 'react';
import { connect } from 'react-redux';
import { setEmailOperation } from '../../actions';
import SimilarButton from './SimilarButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faReply, faReplyAll, faTrashAlt, faShare} from "@fortawesome/free-solid-svg-icons";

const EmailOperations = props => {
 
  return (
      <>
      <SimilarButton />
      <FontAwesomeIcon 
          icon={faReply}
          onClick={() => {
            props.setEmailOperation('reply')
          }} 
      />
      <FontAwesomeIcon 
          icon={faReplyAll}
          onClick={() => {
            props.setEmailOperation('replyall')
          }}
      />
      <FontAwesomeIcon 
          icon={faShare}
          onClick={() => {
            props.setEmailOperation('forward')
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

export default connect(null,{setEmailOperation})(EmailOperations);