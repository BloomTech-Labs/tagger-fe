import axios from "axios";

// The following block of code allows for easy switching between localhost and deployed endpoints throughout all API calls

let local = true;
let cors = "https://cors-anywhere.herokuapp.com/"; // prefixing an endpoint URL with this negates CORS issues\\

//+++++++++++++++++++++++++++++++++++++++++++
//  F O R   D E V E L O P M E N T  O N L Y
//*******************************************
// local = true; //<- uncomment for local development
// cors = "";    //<- uncomment for local development
//+++++++++++++++++++++++++++++++++++++++++++

let url;
if (local) {
  url = "http://localhost:8000/";
} else {
  url = "https://tagger-labs20.herokuapp.com/";
}

// =============================================================================
// Get User Id__________________________________________________________________

export const CHANGE_IS_LOGGED_IN = "CHANGE_IS_LOGGED_IN";

export const changeIsLoggedIn = bool => dispatch => {
  dispatch({ type: CHANGE_IS_LOGGED_IN, payload: bool });
};

export const GET_USER_BOXES_START = "GET_USER_BOXES_START";
export const GET_USER_BOXES_SUCCESS = "GET_USER_BOXES_SUCCESS";
export const GET_USER_BOXES_FAILURE = "GET_USER_BOXES_FAILURE";

export const getBoxes = (email, token) => dispatch => {
  dispatch({ type: GET_USER_BOXES_START });
  return axios
    .post(`http://localhost:8000/emails/boxes`, {
      email: email,
      host: "imap.gmail.com",
      token: sessionStorage.getItem("auth_token"),
      id_token: sessionStorage.getItem("id_token")
    })
    .then(res => {
      const boxes = res.data.slice(2)
      dispatch({ type: GET_USER_BOXES_SUCCESS, payload: boxes });
    })
    .catch(err => {
      console.log("BOXES ERROR", err);
      dispatch({ type: GET_USER_BOXES_FAILURE, payload: err });
    });
};
