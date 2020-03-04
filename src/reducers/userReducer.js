import {
    GET_EMAIL_USERID_START,
    GET_EMAIL_USERID_SUCCESS,
    GET_EMAIL_USERID_FAILURE,
    CHANGE_IS_LOGGED_IN,
    GET_USER_BOXES_START,
    GET_USER_BOXES_SUCCESS,
    GET_USER_BOXES_FAILURE
  } from "../actions";
  
  const initialState = {
    emailAddress: "", // derived from OAuth token
    user_id: null, // derived from OAuth token
    userPhotoUrl: "",
    isEmailAddressAndIdRetrieved: false,
    errors: null,
    isLoggedIn: false,
    boxes: [],
    boxesError: null,
    areBoxesRetrieved: false
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
        userPhotoUrl: payload.userPhotoUrl,
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
        case GET_USER_BOXES_START:
          return{
            ...state,
            boxes:[],
            boxesError:null,
            areBoxesRetrieved: false
          };
          case GET_USER_BOXES_SUCCESS:
            return{
              ...state,
              boxes: payload,
              boxesError: null,
              areBoxesRetrieved:true,
            };
            case GET_USER_BOXES_FAILURE:
              return {
                ...state,
                boxes: [],
                boxesError: payload,
                areBoxesRetrieved:false
              }
      default:
        return state;
    }
  };
  