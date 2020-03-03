import { CLEAR_SEARCH_RESULT, SET_SEARCH_RESULT, SET_IS_DISPLAYING_IN_SNIPPETS } from "../actions";

const initialState = {
    searchResults: [],
    isDisplayingInSnippets: false
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
        case SET_IS_DISPLAYING_IN_SNIPPETS:
            return {
                ...state,
                isDisplayingInSnippets: payload
            };
        default:
            return state;
    }
};
