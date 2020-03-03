import axios from "axios";


const url = process.env.REACT_APP_BACKENDURL
    ? process.env.REACT_APP_BACKENDURL
    : "http://localhost:8000/";

console.log("URL", url);


export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";
export const SET_STATIC_SEARCH_RESULT = "SET_STATIC_SEARCH_RESULT";
export const CLEAR_SEARCH_RESULT = "CLEAR_SEARCH_RESULT";
export const CLEAR_SMART_SEARCH = "CLEAR_SMART_SEARCH"
export const SET_IS_DISPLAYING_IN_SNIPPETS = "SET_IS_DISPLAYING_IN_SNIPPETS"
export const SET_IS_DISPLAYING_DROPDOWN = "SET_IS_DISPLAYING_DROPDOWN"


export const saveSearch = (results) => (dispatch) => {
    dispatch({
        type: SET_SEARCH_RESULT,
        payload: results
    });
};

export const saveStaticSearch = (results) => (dispatch) => {
    dispatch({
        type: SET_STATIC_SEARCH_RESULT
    });
};


export const clearSearch = () => (dispatch) => {
    dispatch({
        type: CLEAR_SEARCH_RESULT
    });
};
export const clearSmartSearch = () => dispatch => {
    dispatch({
        type: CLEAR_SMART_SEARCH
    })
};
export const setIsDisplayingInSnippets = (bool) => dispatch => {
    // Set whether search results from the fuzzy search are displayed in Snippets
    dispatch({
        type: SET_IS_DISPLAYING_IN_SNIPPETS,
        payload: bool
    })
};
export const setIsDisplayingDropdown = (bool) => dispatch => {
    console.log("SETISDISPLAYINGDROPDOWN TRIGGA")
    // Set whether search results from the fuzzy search are displayed in Snippets
    dispatch({
        type: SET_IS_DISPLAYING_DROPDOWN,
        payload: bool
    })
};



