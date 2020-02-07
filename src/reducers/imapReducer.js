import {
  GET_EMAILS_START,
  GET_EMAILS_SUCCESS,
  GET_EMAILS_FAILURE
} from "../actions";

const initialState = {
  areEmailsRetrieved: false,
  emails: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
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
      return {
        ...state,
        emails: payload.emails,
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
