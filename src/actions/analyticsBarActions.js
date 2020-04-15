import Axios from "axios";
const url = process.env.REACT_APP_BACKENDURL;

export const SET_ANALYTICS_BAR = "SET_ANALYTICS_BAR";
export const SET_ANALYTICS_BAR_CONTACT = 'SET_ANALYTICS_BAR_CONTACT';

export const setAnalyticsBar = () => dispatch => {
    dispatch({
        type: SET_ANALYTICS_BAR
    });
};

export function setAnalyticsBarContact(email){
    console.log(email)
    return function (dispatch){
        return Axios
                .post(url + `${email}`)
                .then(res => {
                    console.log(res.data)
                    dispatch({
                        type: SET_ANALYTICS_BAR_CONTACT,
                        payload: res.data
                    })
                })
                .catch(err => console.log(err))
    }
}