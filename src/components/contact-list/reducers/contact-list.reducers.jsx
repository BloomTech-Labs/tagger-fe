import { GET_CONTACTS } from "../actions/contact-list.actions";

const defaultContactsState = {
    contacts: []
};

export const contactsResult = (state = defaultContactsState, action) => {
    switch(action.type) {
        case GET_CONTACTS:
                console.log(action.payload);
            return {
                ...state,
                contacts: action.payload
            }
        default:
            return state;
    }
}