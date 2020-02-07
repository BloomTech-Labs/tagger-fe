import {
  GET_EMAILS_START,
  GET_EMAILS_SUCCESS,
  GET_EMAILS_FAILURE
} from "../actions";

const initialState = {
  areEmailsRetrieved: false,
  emails: [],
  errors: null
};

export const imapReducer = (state = initialState, {type, payload}) => {
  switch (type) {
// ==============================================
//           GET USER EMAILS
    case GET_EMAILS_START:
      return {
        ...state,
        areEmailsRetrieved: false
      };
    case GET_EMAILS_SUCCESS:
      console.log("PAYLOAD: ", payload)
      return {
        ...state,
        emails: payload,
        areEmailsRetrieved: true
      };
    case GET_EMAILS_FAILURE:
      return {
        ...state,
        areEmailsRetrieved: false,
        errors: payload
      };
    default:
      return state;
  }
};
