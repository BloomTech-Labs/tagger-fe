import axios from "axios";
import { StrictMode } from "react";

const url = process.env.REACT_APP_BACKENDURL
    ? process.env.REACT_APP_BACKENDURL
    : "http://localhost:8000/";

console.log("URL", url);

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
    console.log("AUTH TOKEN: ", imapAccessHash);

    alert("Im working!");
    return axios
        .post(`${url}emails/stream`, {
            email: emailAddress,
            host: "imap.gmail.com", // << will need to be made dynamic upon integration of other email clients
            token: imapAccessHash,
            id_token: sessionStorage.getItem("id_token")
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
    console.log("AUTH TOKEN: ", imapAccessHash);
    console.log(emailAddress, "email address \n\n");

    return axios
        .post(`${url}emails`, {
            email: emailAddress,
            host: "imap.gmail.com", // << will need to be made dynamic upon integration of other email clients
            token: imapAccessHash,
            id_token: sessionStorage.getItem("id_token")
        })

        .then((Response) => {
            return axios
                .post(`${url}emails/stream`, {
                    email: emailAddress,
                    id_token: sessionStorage.getItem("id_token")
                })
                .then((res) => {
                    console.log("res from /stream", res);
                    const allEmail = res.data.map((email) => {
                        const labelArray = email.labels.split(",");
                        // const toArray = email.to.toLowerCase().split(",");
                        const toArray = email.to ? email.to.toLowerCase().split(",") : null;
                        return {
                            ...email,
                            labels: labelArray,
                            to: toArray
                        };
                    });
                    dispatch({ type: GET_EMAILS_SUCCESS, payload: allEmail });
                    return allEmail;
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

// =============================================================================

// C H A N G E  I S  I F R A M E L O A D E D

export const IFRAME_LOADED = "IFRAME_LOADED";
export const changeIsLoaded = (bool) => (dispatch) => {
    dispatch({ type: IFRAME_LOADED, payload: bool });
};

// =============================================================================
// C H A N G E  S N I P P E T  F I L T E R
export const SET_SNIPPET_FILTER = "SENT_SNIPPET_FILTER";
export const setSnippetFilter = (string) => (dispatch) => {
    dispatch({ type: SET_SNIPPET_FILTER, payload: string });
};

// =======================================================================

//   S M A R T   S E A R C H   E N D P O I N T S

export const TRAIN_MODEL_START = "TRAIN_MODEL_START";
export const TRAIN_MODEL_SUCCESS = "TRAIN_MODEL_SUCCESS";
export const TRAIN_MODEL_FAILURE = "TRAIN_MODEL_FAILURE";

export const trainModel = (userEmailAddress) => (dispatch) => {
    console.log("trainModel action triggered");
    dispatch({ type: TRAIN_MODEL_START });
    return axios
        .post(`${url}emails/train`, {
            email: userEmailAddress,
            id_token: sessionStorage.getItem("id_token"),
            host: "smtp.gmail.com"
        })
        .then((res) => {
            console.log("/n/n/n/n/nTrain model res/n/n/n/n/n", res);
            dispatch({
                type: TRAIN_MODEL_SUCCESS
            });
        })
        .catch((err) => {
            console.log("Train model err", err);
            dispatch({ type: TRAIN_MODEL_FAILURE });
            return false;
        });
};

export const SMART_SEARCH_START = "SMART_SEARCH_START";
export const SMART_SEARCH_SUCCESS = "SMART_SEARCH_SUCCESS";
export const SMART_SEARCH_FAILURE = "SMART_SEARCH_FAILURE";

export const smartSearch = (userEmailAddress, searchParams) => (dispatch) => {
    console.log("Smart search action triggered");
    dispatch({ type: SMART_SEARCH_START });

    const { uid, from, msg, subject } = searchParams;

    return axios
        .post(`${url}emails/predict`, {
            email: userEmailAddress,
            uid: uid || "",
            from: from,
            subject: subject,
            msg: msg,
            id_token: sessionStorage.getItem("id_token")
        })
        .then((res) => {
            console.log("Smart search res", res);
            const smartEmails = res.data.map((email) => {
                const labelArray = email.labels.split(",");
                // const toArray = email.to.toLowerCase().split(",");
                const toArray = email.to ? email.to.toLowerCase().split(",") : null;
                return {
                    ...email,
                    labels: labelArray,
                    to: toArray
                };
            });
            dispatch({
                type: SMART_SEARCH_SUCCESS,
                payload: smartEmails
            });
            return true;
        })
        .catch((err) => {
            console.log("Smart search err", err);
            dispatch({ type: SMART_SEARCH_FAILURE, payload: err });
            return false;
        });
};
