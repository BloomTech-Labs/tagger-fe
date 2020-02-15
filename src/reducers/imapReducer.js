import {
  GET_EMAILS_START,
  GET_EMAILS_SUCCESS,
  GET_EMAILS_FAILURE,
  EMAILS_UPDATE_START,
  EMAILS_UPDATE_SUCCESS,
  EMAILS_UPDATE_FAILURE,
  INCREMENT_STREAM_COUNTER
} from "../actions";

// const sampleEmail = {
//   html: "<div>Bunch of random stuff</div> <div>Bunch of random stuff</div>",
//   text:
//     "This is a fake text body but it's better than Lorem Ipsum so if you like it please hire me as a writer for your novellas",
//   fromEmailAddress: "lflores02142@gmail.com",
//   fromName: "Luis Flores",
//   subject: "This is a subject!",
//   message_id: 1,
//   tags: ""
// };
// const sampleEmail1 = {
//   html: "<div>Bland Food</div> <div>Problems?</div>",
//   text: "Stop eating boring food!",
//   fromEmailAddress: "kirrayz@gmail.com",
//   fromName: "Ray",
//   subject: "Start cooking today!",
//   message_id: 2,
//   tags: ""
// };
// const sampleEmail2 = {
//   html: "<div>Lose Your</div> <div>Teeth!</div>",
//   text: "easy as 1, 2, 3, **** SLAPSHOT ****",
//   fromEmailAddress: "natemosco@gmail.com",
//   fromName: "Nate Mosco",
//   subject: "Hockey",
//   message_id: 3,
//   tags: ""
// };
// const sampleEmail3 = {
//   html: "<div>Trivia</div> <div>Games</div>",
//   text:
//     "There is a great game that we can play. Hop onto our favorite website ;-)",
//   fromEmailAddress: "rosieLasota@gmail.com",
//   fromName: "Rosie",
//   subject: "Wanna play a game?",
//   message_id: 4,
//   tags: ""
// };
// const sampleEmail4 = {
//   html: "<div>Bunch of random stuff</div> <div>Bunch of random stuff</div>",
//   text: "ow much is the reel of steel cable",
//   fromEmailAddress: "VladTL@google.com",
//   fromName: "Vlad TL",
//   subject: "Fabrication Questions",
//   message_id: 5,
//   tags: ""
// };


// const initialState = {
//     areEmailsRetrieved: false,
//     areEmailsUpdated: false,  //todo: get a fn that changes this to false on button press or a timer with useEffect that reRuns the Update
//     emails: [sampleEmail, sampleEmail1, sampleEmail2, sampleEmail3, sampleEmail4],
//     retrieveErrors: null,
//     updateErrors: null,
//   };
const initialState = {
  areEmailsRetrieved: false,
  areEmailsUpdated: false,  //todo: get a fn that changes this to false on button press or a timer with useEffect that reRuns the Update
  streamCounter:0,
  emails: [],
  retrieveErrors: null,
  updateErrors: null,
};

export const imapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // ==============================================
    //           GET USER EMAILS
    case GET_EMAILS_START:
      return {
        ...state,
        areEmailsRetrieved: false,
        retrieveErrors: null
      };
    case GET_EMAILS_SUCCESS:
      return {
        ...state,
        emails: [...state.emails, ...payload],
        areEmailsRetrieved: true,
        retrieveErrors: null
      };
    case GET_EMAILS_FAILURE:
      return {
        ...state,
        areEmailsRetrieved: false,
        retrieveErrors: payload
      };
//=========================================
//     CHECK IF UPDATED BEFORE FETCHING EMAILS
    case EMAILS_UPDATE_START:
      return {
        ...state,
        areEmailsUpdated: false,
        updateErrors: null
      };
    case EMAILS_UPDATE_SUCCESS:
      return {
        ...state,
        areEmailsUpdated: true,
        updateErrors: null
      };
    case EMAILS_UPDATE_FAILURE:
      return {
        ...state,
        areEmailsUpdated: false,
        updateErrors: payload
      };
//================================================
// Increase stream Counter 
    case INCREMENT_STREAM_COUNTER:
      return {
        ...state,
        streamCounter: state.streamCounter +=1
      };
    default:
      return state;
  }
};
