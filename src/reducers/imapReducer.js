const initialState = {
  emails: []
};

const imapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Start Fetch":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default imapReducer;
