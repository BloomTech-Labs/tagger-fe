import axios from "axios";
import {
  GET_EMAIL_USERID_START,
  GET_EMAIL_USERID_SUCCESS,
  GET_EMAIL_USERID_FAILURE
} from "./inboxActions";

let local = false;
let cors = "https://cors-anywhere.herokuapp.com/"; // prefixing an endpoint URL with this negates CORS issues\\

//+++++++++++++++++++++++++++++++++++++++++++
//  F O R   D E V E L O P M E N T  O N L Y
//*******************************************
// local = true; //<- uncomment for local development
cors = "";    //<- uncomment for local development
//+++++++++++++++++++++++++++++++++++++++++++

const url = process.env.REACT_APP_BACKENDURL
  ? process.env.REACT_APP_BACKENDURL
  : "http://localhost:8000/";

export const GET_USER_CONTACTS_START = "GET_USER_CONTACTS_START";
export const GET_USER_CONTACTS_SUCCESS = "GET_USER_CONTACTS_SUCCESS";
export const GET_USER_CONTACTS_FAILURE = "GET_USER_CONTACTS_FAILURE";

export const getContacts = oAuthToken => dispatch => {
  dispatch({ type: GET_USER_CONTACTS_START });
  return axios
    .get(
      `https://people.googleapis.com/v1/people/me/connections?pageSize=2000&personFields=emailAddresses,names,photos&sortOrder=LAST_MODIFIED_ASCENDING&key=${process.env.REACT_APP_APIKEY}`,
      {
        headers: {
          Authorization: `Bearer ${oAuthToken}`,
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => {
      console.log(res, "cover photos");
      let contacts = [];
      if (res.data.connections) {
        contacts = res.data.connections.filter(contact => {
          if (contact.emailAddresses && contact.emailAddresses.length > 1) {
            const emailArray = contact.emailAddresses.map(
              eachEmailAddress => eachEmailAddress.value.toLowerCase()
            );
            return {
              name: contact.names[0].displayName,
              emails: emailArray,
              coverPhotoUrl: contact.photos[0].url
            };
          } else if (
            contact.emailAddresses &&
            contact.emailAddresses.length === 1
          ) {
            return {
              name: contact.names[0].displayName,
              emails: contact.emailAddresses[0].value.toLowerCase(),
              coverPhotoUrl: contact.photos[0].url
            };
          }
        });
      }
      dispatch({ type: GET_USER_CONTACTS_SUCCESS, payload: contacts });
    })
    .catch(err => {
      console.error(err);
    });
};
