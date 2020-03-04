import axios from "axios";

// The following block of code allows for easy switching between localhost and deployed endpoints throughout all API calls
const url = process.env.REACT_APP_BACKENDURL
    ? process.env.REACT_APP_BACKENDURL
    : "http://localhost:8000/";
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
// Check if user is logged in ______________________________________________

export const CHANGE_IS_LOGGED_IN = "CHANGE_IS_LOGGED_IN";

export const changeIsLoggedIn = bool => dispatch => {
  dispatch({ type: CHANGE_IS_LOGGED_IN, payload: bool });
};
// =============================================================================
// Get User email boxes ______________________________________________
export const GET_USER_BOXES_START = "GET_USER_BOXES_START";
export const GET_USER_BOXES_SUCCESS = "GET_USER_BOXES_SUCCESS";
export const GET_USER_BOXES_FAILURE = "GET_USER_BOXES_FAILURE";

export const getBoxes = (email) => dispatch => {
  dispatch({ type: GET_USER_BOXES_START });
  return axios
    .post(`${url}emails/boxes`, {
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

