import { GET_EMAILS_START, GET_EMAILS_SUCCESS, GET_EMAILS_FAILURE } from "../actions";

// const sampleEmail = {
//   html: "<div>Bunch of random stuff</div> <div>Bunch of random stuff</div>",
//   text:
//     "This is a fake text body but it's better than Lorem Ipsum so if you like it please hire me as a writer for your novellas",
//   from: "arnoldSchwarzeneger@gov.com",
//   Name: "Arnold Scwarzinator",
//   subject: "This is a subject!",
//   message_id: 1,
//   tags: ""
// };
// const sampleEmail1 = {
//   html: "<div>Bland Food</div> <div>Problems?</div>",
//   text: "Stop eating boring food!",
//   from: "RaymondFoodie@gmail.com",
//   Name: "Raymond",
//   subject: "Start cooking today!",
//   message_id: 2,
//   tags: ""
// };
// const sampleEmail2 = {
//   html: "<div>Lose Your</div> <div>Teeth!</div>",
//   text: "easy as 1, 2, 3, **** SLAPSHOT ****",
//   from: "WilsonHockeyClub@gmail.com",
//   Name: "Andrew Wilson",
//   subject: "Hockey",
//   message_id: 3,
//   tags: ""
// };
// const sampleEmail3 = {
//   html: "<div>Trivia</div> <div>Games</div>",
//   text:
//     "There is a great game that we can play. Hop onto our favorite website ;-)",
//   from: "rosieLasota@gmail.com",
//   Name: "Rosie",
//   subject: "Wanna play a game?",
//   message_id: 4,
//   tags: ""
// };
// const sampleEmail4 = {
//   html: "<div>Bunch of random stuff</div> <div>Bunch of random stuff</div>",
//   text: "How much is the reel of steel cable",
//   from: "VladTL@google.com",
//   Name: "Vlad TL",
//   subject: "Fabrication Questions",
//   message_id: 5,
//   tags: ""
// };

// const initialState = {
//   areEmailsRetrieved: false,
//   emails: [sampleEmail, sampleEmail1, sampleEmail2, sampleEmail3, sampleEmail4],
//   errors: null
// };
const initialState = {
    areEmailsRetrieved: false,
    emails: [],
    errors: null
};

export const imapReducer = (state = initialState, { type, payload }) => {
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
                emails: [...state.emails, ...payload],
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
