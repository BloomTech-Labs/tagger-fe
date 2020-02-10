import {
  GET_EMAILS_START,
  GET_EMAILS_SUCCESS,
  GET_EMAILS_FAILURE
} from "../actions";
const sampleEmail = {
  html: "<div>Bunch of random stuff</div> <div>Bunch of random stuff</div>",
  text: "This is a fake text body but it's better than Lorem Ipsum so if you like it please hire me as a writer for your novellas",
  fromEmailAddress: "lflores0214@live.com",
  fromName: "Arnold Scwarzinator",
  subject: "This is a subject!"
}
const initialState = {
  areEmailsRetrieved: false,
  emails: [
    sampleEmail,
    sampleEmail,
    sampleEmail,
    sampleEmail,
    sampleEmail,
  ],
  errors: null
};
// const initialState = {
//   areEmailsRetrieved: false,
//   emails: [],
//   errors: null
// };

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
