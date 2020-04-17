import axios from 'axios';

const url = 'https://tagger-be-dev.herokuapp.com/';

export const SEARCH_KEYWORD = "SEARCH_KEYWORD";

export function searchKeyword(keyword){
    return function(dispatch){
        return axios
        .post(url + `emails/search/name`, {keyword:keyword})
        .then(res => dispatch({type:SEARCH_KEYWORD, payload:res.data}))
        .catch(err => dispatch({type:SEARCH_KEYWORD, payload:err}))
    }
}

export const HIDE_RESULTS = "HIDE_RESULTS";

export const hideResults = () => dispatch => {
    dispatch({type:HIDE_RESULTS})
}