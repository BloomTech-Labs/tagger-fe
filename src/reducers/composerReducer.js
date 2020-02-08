import {
  SEND_EMAIL_START,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE
} from "../actions/composerActions";

const initialState = {
  isComposing: false,
  error: null
};

export const composerReducer = (state = initialState, action) => {
  switch (action.type) {
    // Compose and send emails
    case SEND_EMAIL_START:
      return {
        ...state,
        isComposing: true
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        email: action.payload,
        isComposing: false,
        error: null
      };
    case SEND_EMAIL_FAILURE:
      return {
        ...state,
        email: {},
        isComposing: false,
        error: action.payload
      };
    default:
      return state;
  }
};
