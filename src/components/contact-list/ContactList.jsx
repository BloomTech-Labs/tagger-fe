import React from 'react';

import { Route } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import { connect } from "react-redux";

import ContactCard from "./contact-card/ContactCard";

import "./contact-list.scss";

const ContactList = (props) => {

  const handleContactSearch = (email) => {
      props.setSearchQuery(`from:${email}`);  
      // console.log(email);
      performSearch();
    }
  
  const performSearch = () => {
    const searchParams = {}
    if (!props.searchQuery || props.searchQuery === "") {
      searchParams.labelIds = ["INBOX"];
    }
    props.getLabelMessages({...searchParams})
  };

  if (!props.contactsResult.contacts) {
    return <div className="ml-4 mt-4">No contacts found.</div>
  }

  return (
      <PerfectScrollbar className="contact-list-container">
          {props.contactsResult.contacts.map(contact => {
            
              if (!contact.names) {
                return null;
              }

              return (
                  <Route
                    key={contact.names[0].metadata.source.id}
                    path={'/'}
                    render={routeProps => {
                      return (
                        <ContactCard
                          {...routeProps}
                          contact={contact}
                          handleContactSearch={handleContactSearch}
                          searchterm={props.searchterm}
                        />
                      )
                    }}
                  >
                  </Route>
              )
          })}
      </PerfectScrollbar>
  );
}


const mapStateToProps = state => ({
    contactsResult: state.contactsResult
  });
  
export default connect(
    mapStateToProps
)(ContactList);