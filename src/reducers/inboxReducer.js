import {
    CHANGE_IS_DISPLAYING_THREAD,
    CHANGE_IS_DISPLAYING_ANALYTICS,
    CHANGE_THREAD_CONTACT
  } from "../actions";
  
  const initialState = {
    isDisplayingThread: false,
    isDisplayingAnalytics: false,
    threadContactEmailAddress: "CLICK ON AN EMAIL"
  };
  
  export const inboxReducer = (state = initialState, {type, payload}) => {
    switch (type) {
  // ==============================================

  case CHANGE_IS_DISPLAYING_THREAD:
      return {
          ...state,
          isDisplayingThread: payload
        };

  // ==============================================


  case CHANGE_IS_DISPLAYING_ANALYTICS:
      return {
          ...state,
          isDisplayingAnalytics: payload
        };

  // ==============================================


  case CHANGE_THREAD_CONTACT:
      return {
          ...state,
          threadContactEmailAddress: payload.fromEmailAddress
        };

  // ==============================================
      
      default:
        return state;
    }
  };
  