import axios from 'axios';

const url = 'https://tagger-be-dev.herokuapp.com/';

export const SEARCH_KEYWORD = "SEARCH_KEYWORD";

export function search(keyword){
    return function(dispatch){
        return axios
        .post(url + `emails/search`, keyword)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
}