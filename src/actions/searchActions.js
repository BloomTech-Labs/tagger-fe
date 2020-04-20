import axios from 'axios';

const url = process.env.REACT_APP_BACKENDURL
    ? process.env.REACT_APP_BACKENDURL
    : "https://tagger-be-dev.herokuapp.com/";

export const SEARCH_KEYWORD = "SEARCH_KEYWORD";

export function searchKeyword(keyword){
    return function(dispatch){
        return axios
        .post(url + `emails/search/name/1`, {keyword:keyword})
        .then(res => {
            console.log('SEARCH ACTION',res.data)
            dispatch({type:SEARCH_KEYWORD, payload:{emails:res.data, keyword:keyword}});
        })
        .catch(err => dispatch({type:SEARCH_KEYWORD, payload:err}))
    }
}

export const HIDE_RESULTS = "HIDE_RESULTS";

export const hideResults = () => dispatch => {
    dispatch({type:HIDE_RESULTS})
}

export const CHANGE_LISTING = 'CHANGE_LISTING';

export function changeListing(keyword){
    return function(dispatch){
        return axios
        .post(url + `emails/search/name/1`, {keyword:keyword})
        .then(res => dispatch({type:CHANGE_LISTING, payload:{emails:res.data, keyword:keyword}}))
        .catch(err => dispatch({type:CHANGE_LISTING, payload:err}))
    }
}

export const RESET_SEARCH = 'RESET_SEARCH'

export const resetSearch = () => dispatch => {
    dispatch({type:RESET_SEARCH})
}