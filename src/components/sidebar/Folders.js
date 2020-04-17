import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getEmails, setLabel, closeEmail} from '../../actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faFolderOpen,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Folders = props => {

  //const [ label, setLabel ] = useState('inbox')

  const setFilter = (folder) => {
    props.closeEmail()
    props.setLabel(folder)
  }

  useEffect(() => {
    // const interval = setInterval(() => {
      props.getEmails(props.label,props.pageNum)
      // console.log('USE EFFECT RAN')
    // }, 1000 * 60)
    // clearInterval(interval);
  },[props.label])
  
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

const mapStateToProps = ({ inbox }) => ({
  label:inbox.label,
  pageNum: inbox.pageNum
})

export default connect(mapStateToProps,{getEmails,closeEmail,setLabel})(Folders);