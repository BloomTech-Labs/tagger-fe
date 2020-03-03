import { CLEAR_SEARCH_RESULT, SET_SEARCH_RESULT, SET_IS_DISPLAYING_IN_SNIPPETS, SET_IS_DISPLAYING_DROPDOWN, SET_STATIC_SEARCH_RESULT } from "../actions";

const initialState = {
    searchResults: [],
    searchResultsStatic: [],
    isDisplayingInSnippets: false,
    isDisplayingDropdown: false
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
        case SET_STATIC_SEARCH_RESULT:
            return {
                ...state,
                searchResultsStatic: [...state.searchResults]
            };
        case SET_IS_DISPLAYING_IN_SNIPPETS:
            return {
                ...state,
                isDisplayingInSnippets: payload
            };
        case SET_IS_DISPLAYING_DROPDOWN:
            return {
                ...state,
                isDisplayingDropdown: payload
            };
        default:
            return state;
    }
};
