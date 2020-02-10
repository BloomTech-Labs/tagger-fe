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
