import { SET_EMAIL_OPERATION, DISCARD } from '../actions';

const initialState = {
    isHidden: true,
    messageType: null
}

export const setOperationReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case SET_EMAIL_OPERATION:
            return {
                ...state,
                isHidden:false,
                messageType:payload
            }
        case DISCARD:
            return {
                isHidden: true,
                messageType: null
            }
        default:
            return state;
    }
}