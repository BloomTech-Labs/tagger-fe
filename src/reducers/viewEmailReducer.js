import { VIEW_EMAIL, CLOSE_EMAIL, SET_SIMILAR_EMAIL } from '../actions'

const intialState = {
    displayEmailSection: false,
    isThread: false,
    email: ''
}

export const viewEmailReducer = (state = intialState, {type,payload}) => {
    switch(type){
        case VIEW_EMAIL:
            return {
                ...state,
                displayEmailSection:true,
                isThread:false,
                viewemail:payload
            }
        case CLOSE_EMAIL:
            return {
                ...state,
                displayEmailSection:false,
                isThread:false
            }
        case SET_SIMILAR_EMAIL:
            return {
                ...state,
                isThread:true,
                viewemail:payload
            }
        default:
            return state;
    }
}