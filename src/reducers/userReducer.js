import {
    GET_EMAIL_USERID_START,
    GET_EMAIL_USERID_SUCCESS,
    GET_EMAIL_USERID_FAILURE,
  } from "../actions";
  
  const initialState = {
    emailAddress: "", // derived from OAuth token
    user_id: null, // derived from OAuth token
    isEmailAddressAndIdRetrieved: false,
    errors: null
  };
  
  export const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
  //================================================
  //                    USER ID
      case GET_EMAIL_USERID_START:
        return {
          ...state,
          isEmailAddressAndIdRetrieved: false,
        };
      case GET_EMAIL_USERID_SUCCESS:
        return {
          ...state,
          emailAddress: action.payload.emailAddress,
          user_id: action.payload.user_id,
          isEmailAddressAndIdRetrieved: true
        };
      case GET_EMAIL_USERID_FAILURE:
        return {
          ...state,
          isEmailAddressAndIdRetrieved: false,
          errors: payload
        };
      default:
        return state;
    }
  };
  