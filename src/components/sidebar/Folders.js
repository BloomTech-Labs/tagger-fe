import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getEmails, setLabel, closeEmail, resetSearch} from '../../actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faFolderOpen,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Folders = props => {

  const setFilter = (folder) => {
    props.resetSearch()
    props.closeEmail()
    props.setLabel(folder)
  }

  useEffect(() => {
    console.log('HERREEEEE',props.label,props.pageNum,props.isSearch)
    props.getEmails(props.label,props.pageNum,props.isSearch)
    //eslint-disable-next-line
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
  pageNum: inbox.pageNum,
  isSearch:inbox.isSearch
})

export default connect(mapStateToProps,{getEmails,closeEmail,setLabel,resetSearch})(Folders);