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

// =============================================================================
// Get User Id__________________________________________________________________

export const GET_EMAIL_USERID_START = "GET_EMAIL_USERID_START";
export const GET_EMAIL_USERID_SUCCESS = "GET_EMAIL_USERID_SUCCESS";
export const GET_EMAIL_USERID_FAILURE = "GET_EMAIL_USERID_FAILURE";

export const getUserEmailAndId = (oAuthToken) => (dispatch) => {
    // Retrieves user email address and user_id upon successful OAuth login redirect
    dispatch({ type: GET_EMAIL_USERID_START });
    const apiKey = process.env.REACT_APP_APIKEY;
    // console.log(apiKey);
    return axios
        .get(
            `https://people.googleapis.com/v1/people/me?personFields=emailAddresses,photos&key=${apiKey}`,
            {
                headers: {
                    Authorization: `Bearer ${oAuthToken}`,
                    "Content-Type": "application/json"
                }
            }
        )
        .then((res) => {
            const emailAddress = res.data.emailAddresses[0].value;
            const user_id = res.data.emailAddresses[0].metadata.source.id;
            const userPhotoUrl = res.data.photos[0].url;
            // console.log("Response from inbox actions", res.data);
            dispatch({
                type: GET_EMAIL_USERID_SUCCESS,
                payload: { emailAddress, user_id, userPhotoUrl }
            });
            return { emailAddress, user_id, userPhotoUrl };
        })
        .catch((err) => {
            dispatch({ type: GET_EMAIL_USERID_FAILURE, payload: err });
            return false;
        });
};

// =============================================================================
// S T R E A M
// export const STREAM_EMAILS_START = "STREAM_EMAILS_START";
// export const STREAM_EMAILS_SUCCESS = "STREAM_EMAILS_SUCCESS";
// export const STREAM_EMAILS_FAILURE = "STREAM_EMAILS_FAILURE";
export const INCREMENT_STREAM_COUNTER = "INCREMENT_STREAM_COUNTER";

export const incrementCounter = () => (dispatch) => {
    dispatch({ type: INCREMENT_STREAM_COUNTER });
};

// =============================================================================
// Get Email____________________________________________________________________

export const GET_EMAILS_START = "GET_EMAILS_START";
export const GET_EMAILS_SUCCESS = "GET_EMAILS_SUCCESS";
export const GET_EMAILS_FAILURE = "GET_EMAILS_FAILURE";

export const getEmails = (emailAddress, token) => (dispatch) => {
    // Retrieves user emails
    dispatch({ type: GET_EMAILS_START });
    const imapAccess = `user=${emailAddress}auth=Bearer ${token}`; // Between the following arrows >< is either a square or a space. IDK what it is but you need it
    const imapAccessHash = btoa(`user=${emailAddress}auth=Bearer ${token}`); // Between the following arrows >< is either a square or a space. IDK what it is but you need it
    alert("Im working!");
    return axios
        .post(`http://localhost:8000/emails/stream`, {
            email: emailAddress,
            host: "imap.gmail.com", // << will need to be made dynamic upon integration of other email clients
            token: imapAccessHash
        })
        .then((res) => {
            console.log("RES from inbox action", res);
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
                };
            });
            dispatch({ type: GET_EMAILS_SUCCESS, payload: emails });
            dispatch({ type: EMAILS_UPDATE_SUCCESS });
            return emails;
        })
        .catch((err) => {
            dispatch({ type: GET_EMAILS_FAILURE, payload: err });
            return err;
        });
};

// =============================================================================

// =============================================================================
// Check if all emails are gotten ______________________________________________

export const EMAILS_UPDATE_START = "EMAILS_UPDATE_START";
export const EMAILS_UPDATE_SUCCESS = "EMAILS_UPDATE_SUCCESS";
export const EMAILS_UPDATE_FAILURE = "EMAILS_UPDATE_FAILURE";

export const updateEmails = (emailAddress, token) => (dispatch) => {
    // Retrieves user emails
    dispatch({ type: EMAILS_UPDATE_START });
    const imapAccess = `user=${emailAddress}auth=Bearer ${token}`; // Between the following arrows >< is either a square or a space. IDK what it is but you need it
    const imapAccessHash = btoa(`user=${emailAddress}auth=Bearer ${token}`); // Between the following arrows >< is either a square or a space. IDK what it is but you need it

    return axios
        .post(`http://localhost:8000/emails`, {
            email: emailAddress,
            host: "imap.gmail.com", // << will need to be made dynamic upon integration of other email clients
            token: imapAccessHash
        })
        .then(() => {
            return axios
                .post(`http://localhost:8000/emails/stream`, {
                    email: emailAddress
                })
                .then((res) => {
                    dispatch({ type: GET_EMAILS_SUCCESS, payload: res.data });
                    return res.data;
                });
        })
        .catch((err) => {
            dispatch({ type: EMAILS_UPDATE_FAILURE, payload: err });
            return err;
        });
};
// =============================================================================
// C H A N G E   I S   D I S P L A Y I N G   T H R E A D

export const CHANGE_IS_DISPLAYING_THREAD = "CHANGE_IS_DISPLAYING_THREAD";

export const changeIsDisplayingThread = (bool) => (dispatch) => {
    // Set a switch that displays (true) or hides (false) the thread between the user and another email-address
    dispatch({ type: CHANGE_IS_DISPLAYING_THREAD, payload: bool });
};

// =============================================================================
// C H A N G E   I S   D I S P L A Y I N G   A N A L Y T I C S   B A R
export const CHANGE_IS_DISPLAYING_ANALYTICS = "CHANGE_IS_DISPLAYING_ANALYTICS";

export const changeIsDisplayingAnalytics = (bool) => (dispatch) => {
    // Set a switch that displays (true) or hides (false) the analytics bar
    dispatch({ type: CHANGE_IS_DISPLAYING_ANALYTICS, payload: bool });
};

// =============================================================================
// C H A N G E   T H R E A D   C O N T A C T
export const CHANGE_THREAD_CONTACT = "CHANGE_THREAD_CONTACT";

export const changeThreadContact = (contact) => (dispatch) => {
    // Set the contact whose conversation is displayed in Thread.js
    dispatch({ type: CHANGE_THREAD_CONTACT, payload: contact });
};

// =============================================================================
// C H A N G E   A N A L Y T I C S   C O N T A C T
export const CHANGE_ANALYTICS_CONTACT = "CHANGE_ANALYTICS_CONTACT";

export const changeAnalyticsContact = (contact) => (dispatch) => {
    // Set the contact whose analytics are being displayed
    dispatch({ type: CHANGE_ANALYTICS_CONTACT, payload: { contact } });
};
