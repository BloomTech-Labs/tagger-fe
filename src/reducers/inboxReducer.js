import {
    CHANGE_IS_DISPLAYING_THREAD
  } from "../actions";
  
  const initialState = {
    isDisplayingThread: false,
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
      
      default:
        return state;
    }
  };
  