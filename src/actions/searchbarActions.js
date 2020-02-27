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

// =======================================================================

//   S M A R T   S E A R C H   E N D P O I N T S 

export const TRAIN_MODEL_START = "TRAIN_MODEL_START";
export const TRAIN_MODEL_SUCCESS = "TRAIN_MODEL_SUCCESS";
export const TRAIN_MODEL_FAILURE = "TRAIN_MODEL_FAILURE";

export const trainModel = (userEmailAddress) => (dispatch) => {
    console.log("trainModel action triggered")
    dispatch({ type: TRAIN_MODEL_START });
    return axios
        .post(
            `${url}emails/train`, {userEmailAddress}
        )
        .then((res) => {
            console.log("Train model res", res)
            dispatch({
                type: TRAIN_MODEL_SUCCESS,
            });
            return {};
        })
        .catch((err) => {
            console.log("Train model err", err)
            dispatch({ type: TRAIN_MODEL_FAILURE});
            return false;
        });
};
