import React from "react";

import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const NameSubjectFields = props => {

  console.log(props.contactsResult);

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
          {props.hover
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