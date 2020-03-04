import axios from "axios";

export const SEND_EMAIL_START = "SEND_EMAIL_START";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILURE = "SEND_EMAIL_FAILURE";
export const CHANGE_IS_COMPOSING = "CHANGE_IS_COMPOSING";
export const CHANGE_IS_REPLYING = "CHANGE_IS_REPLYING";

const url = process.env.REACT_APP_BACKENDURL
  ? process.env.REACT_APP_BACKENDURL
  : "http://localhost:8000/";

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
export const changeIsComposing = bool => dispatch => {
  // set a switch that displays the compose component if true or hides it if false
  dispatch({ type: CHANGE_IS_COMPOSING, payload: bool });
};
export const changeIsReplying = bool => dispatch => {
  // set a switch that displays the compose component if true or hides it if false
  dispatch({ type: CHANGE_IS_REPLYING, payload: bool });
};
export const sendEmail = (email) => dispatch => {
  // console.log("SEND EMAIL ACTION", email);
  axios
    .post(`${url}compose/`, email)
    .then(res => {
      console.log(res, "RES");
      dispatch({ type: SEND_EMAIL_SUCCESS, payload: res.data });
    })
    .catch(error => {
      console.log(error, "ERROR");
      dispatch({ type: SEND_EMAIL_FAILURE, payload: error });
    });
};
