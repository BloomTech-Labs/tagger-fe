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
                totalEmails: Number(payload.meta.sent) + Number(payload.meta.received),
                sentEmails: Number(payload.meta.sent),
                receivedEmails: Number(payload.meta.received),
                name:payload.meta.name,
                address:payload.address
            }
        default:
            return state; 
    }
}