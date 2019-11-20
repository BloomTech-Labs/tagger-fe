import React, { useEffect } from 'react';

import PerfectScrollbar from "react-perfect-scrollbar";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getUserContacts } from "../contact-list/actions/contact-list.actions";

import "./contact-list.scss";

//Have to add this component below a scrollbar region like the sidebar and messageList

const ContactList = (props) => {

    useEffect(() => {
        getUserContacts();
    }, [])

    const getUserContacts = () => {
        props.getUserContacts();
    }

    const handleContactSearch = (evt) => {
        console.log(evt.currentTarget);
        props.setSearchQuery(evt.currentTarget.value);  
        performSearch();
      }
    
      const performSearch = () => {
        const searchParams = {}
        if (!props.searchQuery || props.searchQuery === "") {
          searchParams.labelIds = ["INBOX"];
        }
        props.getLabelMessages({...searchParams})
      };

    return (
        <PerfectScrollbar className="contact-list-container">
            {props.contactsResult.contacts.map(contact => {
                return (
                    <button onClick={handleContactSearch} value={contact.names[0].displayName}>
                    <div key={contact.etag} className="user-card">
                        <img alt={`${contact.names[0].displayName}'s profile`}></img>
                        <div className="user-text-container">
                            <h2>{contact.names[0].displayName}</h2>
                            <p>Hi Erin, we'll be meeting on Friday to discuss the proposal...</p>
                        </div>
                    </div>
                    </button>
                )
            })}
        </PerfectScrollbar>
    );
}


const mapStateToProps = state => ({
    contactsResult: state.contactsResult
  });
  
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        { getUserContacts },
        dispatch
    );
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactList);