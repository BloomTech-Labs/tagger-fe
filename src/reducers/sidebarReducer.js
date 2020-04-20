import { SET_SLIDING_SIDEBAR } from '../actions'

const initialState = {
    sliderbar: false
}

export const sidebarReducer = (state = initialState, {type}) => {
    switch(type){
        case SET_SLIDING_SIDEBAR:
            return {
                ...state,
                sliderbar:!state.sliderbar
            };
        default:
            return state;
    }
}