import axios from "axios";

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
