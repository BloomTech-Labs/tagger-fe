import {
    // CHANGE_IS_DISPLAYING_THREAD,
    // CHANGE_IS_DISPLAYING_ANALYTICS,
    // CHANGE_THREAD_CONTACT,
    // CHANGE_ANALYTICS_CONTACT,
    // IFRAME_LOADED,
    // SET_SNIPPET_FILTER,
    GET_EMAILS, NEXT_PAGE, PREV_PAGE, SET_LABEL
} from "../actions";
const initialState = {
    // FOR ANALYTICS BAR DEV
    // isIframeLoaded: false,
    // isDisplayingThread: false,
    // isDisplayingAnalytics: false,
    // threadContactEmailAddress: "",
    // thread: null,
    // analyticsContact: {
    //     emailAddress: [""],
    //     name: "",
    //     coverPhoto: ""
    // },
    // snippetsFilter: "\\Inbox",
    label: 'inbox',
    pageNum: 1,
    totalCount: 0,
    emails: []
};

export const inboxReducer = (state = initialState, {type,payload}) => {
    switch(type) {
        case GET_EMAILS:
            return {
                ...state,
                label:state.label,
                totalCount:payload.totalCount.count,
                emails: payload.messages
            }
        case SET_LABEL:
            return {
                ...state,
                pageNum:1,
                label:payload
            }
        case NEXT_PAGE:
            return {
                ...state,
                pageNum: state.pageNum + 1,
                emails:payload.messages
            }
        case PREV_PAGE:
            return {
                ...state,
                pageNum: state.pageNum - 1,
                emails:payload.messages
            }
        default:
            return state
    }
}

// export const inboxReducer = (state = initialState, { type, payload }) => {
//     switch (type) {
//         // ==============================================

//         case CHANGE_IS_DISPLAYING_THREAD:
//             return {
//                 ...state,
//                 isDisplayingThread: payload
//             };

//         // ==============================================

//         case CHANGE_IS_DISPLAYING_ANALYTICS:
//             return {
//                 ...state,
//                 isDisplayingAnalytics: payload
//             };

//         // ==============================================

//         case CHANGE_THREAD_CONTACT:
//             return {
//                 ...state,
//                 threadContactEmailAddress: payload.from,
//                 thread: payload,
//                 isDisplayingThread: true
//             };

//         // ==============================================

//         case CHANGE_ANALYTICS_CONTACT:
//             return {
//                 ...state,
//                 analyticsContact: payload.contact
//             };

//         // ==============================================
//         case IFRAME_LOADED:
//             return {
//                 ...state,
//                 isIframeLoaded: payload
//             };
//         // ==============================================
//         case SET_SNIPPET_FILTER:
//             return {
//                 ...state,
//                 snippetsFilter: payload
//             };
       
//         default:
//             return state;
//     }
// };
