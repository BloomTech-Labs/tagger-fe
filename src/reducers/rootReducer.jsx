import { combineReducers } from "redux";
import { signedOutReducer } from "./gapi.reducers";
import { signInStatusResult } from "./gapi.reducers";

import { labelsResult } from "../components/sidebar/sidebar.reducers";
import { messagesResult, emailMessageResult, pageTokens, searchQuery } from "../components/content/message-list/reducers/message-list.reducers";
import { contactsResult } from "../components/contact-list/reducers/contact-list.reducers";

export default combineReducers({
  signedOutReducer,
  signInStatusResult,
  labelsResult,
  messagesResult,
  emailMessageResult,
  pageTokens,
  searchQuery,
  contactsResult
});
