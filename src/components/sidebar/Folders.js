import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faFolderOpen,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Folders = () => {

    const setFilter = () => {

    }

    return (
        <nav>
        {/* this onClick sets the snippets to filter email by received */}
        <li onClick={() => setFilter("\\Inbox")}><FontAwesomeIcon icon={faInbox} />Inbox</li>
        {/* this onClick sets the snippets to filter email by sent */}
        <li onClick={() => setFilter("\\Sent")}><FontAwesomeIcon icon={faEnvelope} />Sent</li>
        {/* this onClick sets the snippets to filter email by drafts */}
        <li onClick={() => setFilter("\\Draft")}><FontAwesomeIcon icon={faFolderOpen} />Draft</li>
      </nav>
    )
}

export default Folders;