import axios from "axios";


let local = false;
let cors = "https://cors-anywhere.herokuapp.com/"; // prefixing an endpoint URL with this negates CORS issues

//+++++++++++++++++++++++++++++++++++++++++++
//  F O R   D E V E L O P M E N T  O N L Y
//*******************************************
local = true; //<- uncomment for local development
cors = "";    //<- uncomment for local development
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

export const sampleFunction = (sampleId) => dispatch => {
    console.log("Sample function action trigger")
    // dispatch({ type: SAMPLE_FUNCTION_START, payload: {sampleKey: "sampleValue"} });
    dispatch({ type: SAMPLE_FUNCTION_SUCCESS, payload: {sampleKey: "sampleValue"} });
    // dispatch({ type: SAMPLE_FUNCTION_FAILURE, payload: {sampleKey: "sampleValue"} });
};


// =============================================================================

// PROMISE EXAMPLE______________________________________________________________

export const getUserEmailAndId = (token) => dispatch => {
  dispatch({ type: GET_EMAIL_USERID_START });
  const apiKey = process.env.REACT_APP_APIKEY
  return axios
    .get(`https://people.googleapis.com/v1/people/me?personFields=emailAddresses&key=${apiKey}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
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
      console.log(err.response);
      dispatch({ type: GET_EMAIL_USERID_FAILURE });
    });
};
