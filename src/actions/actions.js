import axios from "axios";



// The following block of code allows for easy switching between localhost and deployed endpoints throughout all API calls

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






export const SAMPLE_FUNCTION_START = "SAMPLE_FUNCTION_START";
export const SAMPLE_FUNCTION_SUCCESS = "SAMPLE_FUNCTION_SUCCESS";
export const SAMPLE_FUNCTION_FAILURE = "SAMPLE_FUNCTION_FAILURE";

export const GET_EMAIL_USERID_START = "GET_EMAIL_USERID_START";
export const GET_EMAIL_USERID_SUCCESS = "GET_EMAIL_USERID_SUCCESS";
export const GET_EMAIL_USERID_FAILURE = "GET_EMAIL_USERID_FAILURE";

export const GET_EMAILS_START = "GET_EMAILS_START";
export const GET_EMAILS_SUCCESS = "GET_EMAILS_SUCCESS";
export const GET_EMAILS_FAILURE = "GET_EMAILS_FAILURE";


export const sampleFunction = (sampleId) => dispatch => {
    console.log("Sample function action trigger")
    // dispatch({ type: SAMPLE_FUNCTION_START, payload: {sampleKey: "sampleValue"} });
    dispatch({ type: SAMPLE_FUNCTION_SUCCESS, payload: {sampleKey: "sampleValue"} });
    // dispatch({ type: SAMPLE_FUNCTION_FAILURE, payload: {sampleKey: "sampleValue"} });
};


// =============================================================================

// PROMISE EXAMPLE______________________________________________________________

export const getUserEmailAndId = (oAuthToken) => dispatch => {
  // Retrieves user email address and user_id upon successful OAuth login redirect
  dispatch({ type: GET_EMAIL_USERID_START });
  const apiKey = process.env.REACT_APP_APIKEY
  return axios
    .get(`https://people.googleapis.com/v1/people/me?personFields=emailAddresses&key=${apiKey}`, {
        headers: {
          'Authorization': `Bearer ${oAuthToken}`,
          'Content-Type': 'application/json'
        }
    })
    .then(res => {
      const emailAddress = res.data.emailAddresses[0].value
      const user_id = res.data.emailAddresses[0].metadata.source.id
      dispatch({ type: GET_EMAIL_USERID_SUCCESS, payload: {emailAddress, user_id} });
      return { emailAddress, user_id}
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_EMAIL_USERID_FAILURE });
    });
};


export const getEmails = (emailAddress, token) => dispatch => {
  // Retrieves user emails
  dispatch({ type: GET_EMAILS_START });
  const imapAccess = `user=${emailAddress}auth=Bearer ${token}` // Between the following arrows >< is either a square or a space. IDK what it is but you need it
  const imapAccessHash = btoa(`user=${emailAddress}auth=Bearer ${token}`) // Between the following arrows >< is either a square or a space. IDK what it is but you need it
  
  return axios
    .post(`http://localhost:8000/emails`, {
        email: emailAddress,
        host: "imap.gmail.com", // << will need to be made dynamic upon integration of other email clients
        token: imapAccessHash
    })
    .then(res => {
      console.log("GET_EMAILS_RES: ", res)
      const emails = res.data.map((emailObj) => {
         return { 
          html: emailObj.html,
          text: emailObj.text,
          fromEmailAddress: emailObj.from.value[0].address,
          fromName: emailObj.from.value[0].name,
          subject: emailObj.subject,
          attachments: emailObj.attachments,
          message_id: emailObj.id,
          tags: emailObj.tags
        }
      })
      dispatch({ type: GET_EMAILS_SUCCESS, payload: {emails: emails} });
      return emails
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_EMAILS_FAILURE });
      return err
    });
};


