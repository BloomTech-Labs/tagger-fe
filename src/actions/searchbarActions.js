import axios from "axios";


const url = process.env.REACT_APP_BACKENDURL
    ? process.env.REACT_APP_BACKENDURL
    : "http://localhost:8000/";

console.log("URL", url);


export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";
export const CLEAR_SEARCH_RESULT = "CLEAR_SEARCH_RESULT";

export const saveSearch = (results) => (dispatch) => {
    dispatch({
        type: SET_SEARCH_RESULT,
        payload: results
    });
};

export const clearSearch = () => (dispatch) => {
    dispatch({
        type: CLEAR_SEARCH_RESULT
    });
};


