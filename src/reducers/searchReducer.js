import { SEARCH_KEYWORD, HIDE_RESULTS, CHANGE_LISTING, RESET_SEARCH} from "../actions";

const initialState = {
    result:null,
    keyword:'',
    changeListing: false,
    isHidden:true
}

export const searchKeyword = (state = initialState, {type, payload}) => {
    switch(type){
        case SEARCH_KEYWORD:
            return {
                ...state,
                result: payload.emails.messages,
                keyword:payload.keyword,
                isHidden: false
            }
        case HIDE_RESULTS:
            return {
                ...state,
                isHidden: true
            }
        case CHANGE_LISTING:
            return {
                ...state,
                changeListing:true,
                result:payload.emails
            }
        case RESET_SEARCH:
            return {
                ...state,
                changeListing:false
            }
        default:
            return state
    }
}