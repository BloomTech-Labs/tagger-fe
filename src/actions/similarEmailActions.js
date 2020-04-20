// WILL BE IMPORTED TO VIEWEMAIL REDUCER
import Axios from "axios";

const url = process.env.REACT_APP_BACKENDURL
    ? process.env.REACT_APP_BACKENDURL
    : "https://tagger-be-dev.herokuapp.com/";

export const SET_SIMILAR_EMAIL = 'SET_SIMILAR_EMAIL';

export const setSimilarEmail = id => {
    return function(dispatch){
        return Axios
            .get(url + `emails/email/thread/${id}`)
            .then(res => {
                if(res.data.length > 1){
                    dispatch({type:SET_SIMILAR_EMAIL, payload:res.data})
                }
            })
            .catch(err => dispatch({type:SET_SIMILAR_EMAIL, payload:err}))
    }
}