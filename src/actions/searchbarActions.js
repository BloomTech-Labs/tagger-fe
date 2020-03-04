import axios from "axios";


const url = process.env.REACT_APP_BACKENDURL
    ? process.env.REACT_APP_BACKENDURL
    : "http://localhost:8000/";

console.log("URL", url);

// =============================================================================
// S E A R C H  B A R  A C T I O N S  
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
}
// =============================================================================
// S M A R T  S E A R C H  B A R  T R A I N I N G  A C T I O N S  
export const TRAIN_MODEL_START = "TRAIN_MODEL_START";
export const TRAIN_MODEL_SUCCESS = "TRAIN_MODEL_SUCCESS";
export const TRAIN_MODEL_FAILURE = "TRAIN_MODEL_FAILURE";

export const trainModel = (userEmailAddress) => (dispatch) => {
    console.log("trainModel action triggered");
    dispatch({ type: TRAIN_MODEL_START });
    return axios
        .post(`${url}emails/train`, {
            email: userEmailAddress,
            id_token: sessionStorage.getItem("id_token"),
            host: "smtp.gmail.com"
        })
        .then((res) => {
            console.log("/n/n/n/n/nTrain model res/n/n/n/n/n", res);
            dispatch({
                type: TRAIN_MODEL_SUCCESS
            });
        })
        .catch((err) => {
            console.log("Train model err", err);
            dispatch({ type: TRAIN_MODEL_FAILURE });
            return false;
        });
};
// =============================================================================
// S M A R T  S E A R C H  Q U E R Y  A C T I O N S  
export const SMART_SEARCH_START = "SMART_SEARCH_START";
export const SMART_SEARCH_SUCCESS = "SMART_SEARCH_SUCCESS";
export const SMART_SEARCH_FAILURE = "SMART_SEARCH_FAILURE";

export const smartSearch = (userEmailAddress, searchParams) => (dispatch) => {
    console.log("Smart search action triggered");
    dispatch({ type: SMART_SEARCH_START });

    const { uid, from, msg, subject } = searchParams;

    return axios
        .post(`${url}emails/predict`, {
            email: userEmailAddress,
            uid: uid || "",
            from: from,
            subject: subject,
            msg: msg,
            id_token: sessionStorage.getItem("id_token")
        })
        .then((res) => {
            // console.log("Smart search res", res);
            dispatch({
                type: SMART_SEARCH_SUCCESS,
                payload: res.data
            });
            return true;
        })
        .catch((err) => {
            // console.log("Smart search err", err);
            dispatch({ type: SMART_SEARCH_FAILURE, payload: err });
            return false;
        });
};
// =============================================================================
// R E S U L T  D I S P L A Y  S W I T C H E S
export const setIsDisplayingInSnippets = (bool) => dispatch => {
    // Set whether search results from the fuzzy search are displayed in Snippets
    dispatch({
        type: SET_IS_DISPLAYING_IN_SNIPPETS,
        payload: bool
    })
};
export const setIsDisplayingDropdown = (bool) => dispatch => {
    // Set whether search results from the fuzzy search are displayed in Snippets
    dispatch({
        type: SET_IS_DISPLAYING_DROPDOWN,
        payload: bool
    })
};
