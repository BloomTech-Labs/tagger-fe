import { CLEAR_SEARCH_RESULT, SET_SEARCH_RESULT } from "../actions";

const initialState = {
    searchResults: []
};

export const searchbarReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CLEAR_SEARCH_RESULT:
            return {
                ...state,
                searchResults: []
            };
        case SET_SEARCH_RESULT:
            return {
                ...state,
                searchResults: payload
            };
        default:
            return state;
    }
};
