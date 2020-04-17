import { SEARCH_KEYWORD, HIDE_RESULTS } from "../actions";

const initialState = {
    result:null,
    isHidden:true
}

export const searchKeyword = (state = initialState, {type, payload}) => {
    switch(type){
        case SEARCH_KEYWORD:
            return {
                ...state,
                result: payload,
                isHidden: false
            }
        case HIDE_RESULTS:
            return {
                ...state,
                isHidden: true
            }
        default:
            return state
    }
}