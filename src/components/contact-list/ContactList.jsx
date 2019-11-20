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

    const handleContactSearch = (name) => {
        console.log(name);
        props.setSearchQuery(name);  
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
                    <div
                        key={contact.etag}
                        className="user-card"
                        onClick={() => handleContactSearch(contact.names[0].displayName)}
                    >
                        <img alt={`${contact.names[0].displayName}`}></img>
                        <div className="user-text-container">
                            <h3>{contact.names[0].displayName}</h3>
                            <p>Hi Erin, we'll be meeting on Friday to discuss the proposal...</p>
                        </div>
                    </div>
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