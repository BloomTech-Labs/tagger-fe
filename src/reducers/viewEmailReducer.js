import { VIEW_EMAIL, CLOSE_EMAIL } from '../actions'

const intialState = {
    displayEmailSection: false,
    email: ''
}

export const viewEmailReducer = (state = intialState, {type,payload}) => {
    switch(type){
        case VIEW_EMAIL:
            return {
                ...state,
                displayEmailSection:true,
                viewemail:payload
            }
        case CLOSE_EMAIL:
            return {
                ...state,
                displayEmailSection:false
            }
        default:
            return state;
    }
}