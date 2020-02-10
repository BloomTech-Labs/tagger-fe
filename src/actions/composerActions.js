import axios from "axios";

export const SEND_EMAIL_START = "SEND_EMAIL_START";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILURE = "SEND_EMAIL_FAILURE";
export const CHANGE_IS_COMPOSING = "CHANGE_IS_COMPOSING"

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

// let email = {
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: "465",
//   userEmail: "taggerlabs20@gmail.com",
//   receiver: "lflores0214@live.com",
//   subject: "This is a test from labs 20",
//   body: "This the test body from labs 20"
// };

// Send email actions
export const sendEmailStart = email => ({
  type: SEND_EMAIL_START,
  payload: email
});

export const sendEmailSuccess = email => ({
  type: SEND_EMAIL_SUCCESS,
  payload: {
    ...email
  }
});
export const sendEmailFailure = error => ({
  type: SEND_EMAIL_FAILURE,
  payload: error
});
export const changeIsComposing = (bool) => dispatch => {
  // set a switch that displays the compose component if true or hides it if false
  dispatch({type: CHANGE_IS_COMPOSING, payload: bool})
}
export const sendEmail = (email) => dispatch => {
  console.log("SEND EMAIL ACTION", email);
  dispatch({ type: SEND_EMAIL_START });
  axios
    .post(`${url}compose/`, email)
    .then(res => {
      dispatch(sendEmailSuccess(res.data));
    })
    .catch(error => {
      dispatch(sendEmailFailure(error.response));
    });
};
