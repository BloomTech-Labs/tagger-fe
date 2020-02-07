import {
    CHANGE_IS_DISPLAYING_THREAD,
    CHANGE_IS_DISPLAYING_ANALYTICS,
  } from "../actions";
  
  const initialState = {
    isDisplayingThread: false,
    isDisplayingAnalytics: false,
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
      
      default:
        return state;
    }
  };
  