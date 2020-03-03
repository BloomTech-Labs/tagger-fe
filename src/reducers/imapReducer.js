import {
    GET_EMAILS_START,
    GET_EMAILS_SUCCESS,
    GET_EMAILS_FAILURE,
    EMAILS_UPDATE_START,
    EMAILS_UPDATE_SUCCESS,
    EMAILS_UPDATE_FAILURE,
    INCREMENT_STREAM_COUNTER
} from "../actions";

const initialState = {
    areEmailsRetrieved: false,
    areEmailsUpdated: false, //todo: get a fn that changes this to false on button press or a timer with useEffect that reRuns the Update
    streamCounter: 0,
    emails: [],
    retrieveErrors: null,
    updateErrors: null
};

export const imapReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // ==============================================
        //           GET USER EMAILS
        // case GET_EMAILS_START:
        //     return {
        //         ...state,
        //         areEmailsRetrieved: false,
        //         retrieveErrors: null
        //     };
        // case GET_EMAILS_SUCCESS:
        //     return {
        //         ...state,
        //         emails: [...state.emails, ...payload],
        //         areEmailsRetrieved: true,
        //         retrieveErrors: null
        //     };
        // case GET_EMAILS_FAILURE:
        //     return {
        //         ...state,
        //         areEmailsRetrieved: false,
        //         retrieveErrors: payload
        //     };
        //=========================================
        //     CHECK IF UPDATED BEFORE FETCHING EMAILS
        case EMAILS_UPDATE_START:
            return {
                ...state,
                areEmailsUpdated: false,
                emails:[],
                areEmailsRetrieved: false,
                updateErrors: null
            };
        case EMAILS_UPDATE_SUCCESS:
            return {
                ...state,
                areEmailsUpdated: true,
                emails: [...state.emails, ...payload],
                areEmailsRetrieved: true,
                updateErrors: null
            };
        case EMAILS_UPDATE_FAILURE:
            return {
                ...state,
                areEmailsUpdated: false,
                updateErrors: payload,
                emails:[],
                areEmailsRetrieved: false,
            };
        //================================================
        // Increase stream Counter
        case INCREMENT_STREAM_COUNTER:
            return {
                ...state,
                streamCounter: (state.streamCounter += 1)
            };
        default:
            return state;
    }
};
