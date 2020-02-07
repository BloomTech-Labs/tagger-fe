import {
  SAMPLE_FUNCTION_START,
  SAMPLE_FUNCTION_SUCCESS,
  SAMPLE_FUNCTION_FAILURE,
  GET_EMAIL_USERID_START,
  GET_EMAIL_USERID_SUCCESS,
  GET_EMAIL_USERID_FAILURE,
  GET_EMAILS_START,
  GET_EMAILS_SUCCESS,
  GET_EMAILS_FAILURE
} from "../actions";

const initialState = {
  sampleState: true,
  emailAddress: "", // derived from OAuth token
  user_id: null, // derived from OAuth token
  isEmailAddressAndIdRetrieved: false,
  areEmailsRetrieved: false,
  emails: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // =========================================

    //               SAMPLE GROUP

    // case SAMPLE_FUNCTION_START:
    // return {
    //     ...state,
    // };
    case SAMPLE_FUNCTION_SUCCESS:
      console.log("Sample function reducer trigger");
      return {
        ...state,
        sampleState: !state.sampleState
      };
    // case SAMPLE_FUNCTION_FAILURE:
    // return {
    //     ...state,
    // };

    // =========================================

    //         GET USER EMAIL AND ID

    case GET_EMAIL_USERID_START:
      return {
        ...state
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
        ...state
      };

    // =========================================

    //           GET USER EMAILS

    case GET_EMAILS_START:
      return {
        ...state
      };
    case GET_EMAILS_SUCCESS:
      return {
        ...state,
        emails: action.payload.emails,
        areEmailsRetrieved: true
      };
    case GET_EMAILS_FAILURE:
      return {
        ...state
      };

    // =========================================

    default:
      return state;
  }
};
