import {
  SEND_EMAIL_START,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  CHANGE_IS_COMPOSING,
} from "../actions/composerActions";

const initialState = {
  email:{
    service: "gmail",
    host: "smtp.gmail.com",
    port: "465",
    userEmail: "taggerlabs20@gmail.com",
    receiver: "",
    subject: "",
    body: ""
  },
  isComposing: false,
  error: null
};

export const composerReducer = (state = initialState, action) => {
  switch (action.type) {

    case CHANGE_IS_COMPOSING: 
    return{
      ...state,
      isComposing: action.payload
    }
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
