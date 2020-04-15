import { SEARCH_KEYWORD } from "../actions";

const initialState = {
    result:''
}

export const searchKeyword = (state = initialState, {type, payload}) => {
    switch(type){
        case SEARCH_KEYWORD:
            return {
                ...state,
                result: payload
            }
        default:
            return state
    }
}