import {
    CHANGE_IS_DISPLAYING_THREAD,
    CHANGE_IS_DISPLAYING_ANALYTICS,
    CHANGE_THREAD_CONTACT,
    CHANGE_ANALYTICS_CONTACT
  } from "../actions";
  
  // const initialState = {
  //   isDisplayingThread: false,
  //   isDisplayingAnalytics: false,
  //   threadContactEmailAddress: "CLICK ON AN EMAIL",
  //   analyticsContactEmailAddress: "",
  // };
  
  const initialState = { // FOR ANALYTICS BAR DEV
    isDisplayingThread: true,
    isDisplayingAnalytics: true,
    threadContactEmailAddress: "arnoldSchwarzeneger@gov.com",
    analyticsContact: {
      emailAddress: "arnoldSchwarzeneger@gov.com",
      name: "George Washington",
      coverPhoto: ""
    },
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


  case CHANGE_ANALYTICS_CONTACT:
      return {
          ...state,
          analyticsContact: payload.contact
        };

  // ==============================================
      
      default:
        return state;
    }
  };
  