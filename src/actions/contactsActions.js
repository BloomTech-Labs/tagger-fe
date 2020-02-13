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
local = true; //<- uncomment for local development
// cors = "";    //<- uncomment for local development
//+++++++++++++++++++++++++++++++++++++++++++

let url;
if (local) {
  url = "http://localhost:8000/";
} else {
  url = "deployed backend root URL here";
}

export const GET_USER_CONTACTS_START = "GET_USER_CONTACTS_START";
export const GET_USER_CONTACTS_SUCCESS = "GET_USER_CONTACTS_SUCCESS";
export const GET_USER_CONTACTS_FAILURE = "GET_USER_CONTACTS_FAILURE";

let contactsIds = [];
let contacts = [];
export const getContactsInfo = oAuthToken => dispatch => {
  dispatch({ type: GET_USER_CONTACTS_START });
  return axios
    .get(`https://people.googleapis.com/v1/contactGroups/all?maxMembers=200`, {
      headers: {
        Authorization: `Bearer ${oAuthToken}`,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      // console.log("This is the res data from contacts get", res.data);
      res.data.memberResourceNames.map(contactId => {
        return axios
          .get(
            `https://people.googleapis.com/v1/${contactId}?personFields=emailAddresses,names,coverPhotos`,
            {
              headers: {
                Authorization: `Bearer ${oAuthToken}`,
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            // console.log("RES", res);
            if (res.data.emailAddresses && res.data.coverPhotos) {
              contacts.push({
                name: res.data.names[0].displayName,
                email: res.data.emailAddresses[0].value,
                photoUrl: res.data.coverPhotos[0].url
              });
            } else if (res.data.emailAddresses && !res.data.coverPhotos) {
              contacts.push({
                name: res.data.names[0].displayName,
                email: res.data.emailAddresses[0].value
              });
            }
          });
      });
      console.log("Contacts from actions", contacts);
      dispatch({ type: GET_USER_CONTACTS_SUCCESS, payload: contacts });
      return contacts;
    })
    .catch(error => {
      console.log("this is the error from the contacts get", error);
      dispatch({ type: GET_USER_CONTACTS_FAILURE, payload: error });
    });
};
