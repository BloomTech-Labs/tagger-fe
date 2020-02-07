import {
    GET_EMAIL_USERID_START,
    GET_EMAIL_USERID_SUCCESS,
    GET_EMAIL_USERID_FAILURE,
    CHANGE_IS_LOGGED_IN
  } from "../actions";
  
  const initialState = {
    emailAddress: "", // derived from OAuth token
    user_id: null, // derived from OAuth token
    isEmailAddressAndIdRetrieved: false,
    errors: null,
    isLoggedIn: false,
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
        emailAddress: payload.emailAddress,
        user_id: payload.user_id,
        isEmailAddressAndIdRetrieved: true
      };
      case GET_EMAIL_USERID_FAILURE:
        return {
          ...state,
          isEmailAddressAndIdRetrieved: false,
          errors: payload
        };
        
    //================================================
      
      case CHANGE_IS_LOGGED_IN:
        return {
          ...state,
          isLoggedIn: payload,
        };


    //================================================
        
      default:
        return state;
    }
  };
  