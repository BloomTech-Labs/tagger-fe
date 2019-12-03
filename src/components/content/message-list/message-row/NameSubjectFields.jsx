import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const NameSubjectFields = props => {
  const [contactExists, setContactExists] = useState(false);

  useEffect(() => {
    checkIfContactExists(props.contactsResult.contacts);
  }, [])

  const checkIfContactExists = contacts => {
    let match = false;

    contacts.map(contact => {
      if (props.fromName.name === contact.names[0].displayName) {
        return match = true;
      }
    })

    return setContactExists(match);
  }

  const createContact = evt => {
    evt.stopPropagation();

    if (props.fromName.givenName) {
      return window.gapi.client.people.people.createContact({
        "names": [
          {
            "givenName": props.fromName.givenName,
            "familyName": props.fromName.familyName
          }
        ],
        "emailAddresses": [
          {
            "value": props.fromEmail
          }
        ]
      })
      .then(res => console.log(res));
    }

    return window.gapi.client.people.people.createContact({
      "names": [
        {
          "givenName": props.fromName.name
        }
      ],
      "emailAddresses": [
        {
          "value": props.fromEmail
        }
      ]
    })
    .then(res => console.log(res));
  }

  return (
    <div className="wrapper text-4">
      <div className="wrapper align-items-center text-2">
        <div className="text from-name">
          {props.fromName.name}
          {props.hover && !contactExists
          ? <FontAwesomeIcon
              className="ml-2"
              icon={faUserPlus}
              onClick={evt => createContact(evt)}
            />
          : null}
        </div>
        <div className="text">{props.subject}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  contactsResult: state.contactsResult
});

export default connect(
  mapStateToProps
)(NameSubjectFields);