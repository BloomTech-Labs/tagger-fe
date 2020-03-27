import { SET_BACK_BUTTON } from '../actions'

const initialState = {
    backButton: false
}

export const backButtonReducer = (state = initialState, {type , payload}) => {
    switch(type){
        case SET_BACK_BUTTON:
            return {
                ...state,
                backButton:!state.backButton
            };
        default:
            return state;
    }
}