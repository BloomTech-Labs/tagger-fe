import { getContactList } from "../../../api";

export const GET_CONTACTS = "GET_CONTACTS";

export const getUserContacts = () => dispatch => {
    getContactList().then(response => {
        console.log(response);
        dispatch({
            type: GET_CONTACTS,
            payload: response.result.connections
        })
    })
}