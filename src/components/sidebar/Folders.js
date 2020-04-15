import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getEmails } from '../../actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faFolderOpen,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Folders = props => {

  const [ label, setLabel ] = useState('inbox')

  const setFilter = (folder) => {
    setLabel(folder)
  }

  useEffect(() => {
    props.getEmails(label)
  },[label])
  
    return (
        <nav>
        {/* this onClick sets the snippets to filter email by received */}
        <li onClick={() => setFilter("inbox")}><FontAwesomeIcon icon={faInbox} />Inbox</li>
        {/* this onClick sets the snippets to filter email by sent */}
        <li onClick={() => setFilter('sent')}><FontAwesomeIcon icon={faEnvelope} />Sent</li>
        {/* this onClick sets the snippets to filter email by drafts */}
        <li onClick={() => setFilter('draft')}><FontAwesomeIcon icon={faFolderOpen} />Draft</li>
      </nav>
    )
}

export default connect(null,{getEmails})(Folders);