import {
  GET_USER_CONTACTS_START,
  GET_USER_CONTACTS_SUCCESS,
  GET_USER_CONTACTS_FAILURE,
  
} from "../actions";

const initialState = {
  areContactsRetrieved: false,
  contacts: [],
  threadContacts:[],
  errors: null
};

export const contactsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Get user contacts
    case GET_USER_CONTACTS_START:
      return {
        ...state,
        areContactsRetrieved: false
      };
    case GET_USER_CONTACTS_SUCCESS:
      
      return {
        ...state,
        contacts: [...payload],
        areContactsRetrieved: true
      };
    case GET_USER_CONTACTS_FAILURE:
      return {
        ...state,
        areContactsRetrieved: false,
        errors: payload
      };
      
    default:
      return state;
  }
};
