import { SET_ANALYTICS_BAR, SET_ANALYTICS_BAR_CONTACT } from '../actions'

const initialState = {
   analyticsbar: false,
   email: null,
   totalEmails: null,
   sentEmails: null,
   receivedEmails: null,
}

export const analyticsBarReducer = (state = initialState, {type,payload}) => {
    switch(type){
        case SET_ANALYTICS_BAR:
            return {
                ...state,
                analyticsbar:!state.analyticsbar
            };
        case SET_ANALYTICS_BAR_CONTACT:
            return {
                ...state,
                email: payload.email,
                totalEmails: payload.totalEmails,
                sentEmails: payload.sentEmails,
                receivedEmails: payload.receivedEmails
            }
        default:
            return state; 
    }
}