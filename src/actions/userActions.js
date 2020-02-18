import axios from "axios";

// The following block of code allows for easy switching between localhost and deployed endpoints throughout all API calls

let local = false;
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

export const changeIsLoggedIn = (bool) => dispatch => {
    dispatch({ type: CHANGE_IS_LOGGED_IN, payload: bool });
};
