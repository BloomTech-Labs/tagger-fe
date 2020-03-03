import {
  CLEAR_SEARCH_RESULT,
  SET_SEARCH_RESULT,
  TRAIN_MODEL_START,
  TRAIN_MODEL_SUCCESS,
  TRAIN_MODEL_FAILURE,
  SMART_SEARCH_START,
  SMART_SEARCH_SUCCESS,
  SMART_SEARCH_FAILURE,
  CLEAR_SMART_SEARCH
} from "../actions";

const initialState = {
  searchResults: [],
  isModelTrained: false,
  isTrainingModel: false,
  smartSearchResults: [],
  smartSearchError: null
};

export const searchbarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_SEARCH_RESULT:
      return {
        ...state,
        searchResults: []
      };
    case SET_SEARCH_RESULT:
      return {
        ...state,
        searchResults: payload
      };
      // ==============================================
      case TRAIN_MODEL_START:
        return {
            ...state,
            isTrainingModel: true
        };
    case TRAIN_MODEL_SUCCESS:
        return {
            ...state,
            isModelTrained: true,
            isTrainingModel: false
        };
    case TRAIN_MODEL_FAILURE:
        return {
            ...state,
            snippetsFilter: payload,
            isTrainingModel: false
        };
    // ==============================================
    case SMART_SEARCH_START:
        return {
            ...state,
            smartSearchResults: [],
            smartSearchError: null
        };
    case SMART_SEARCH_SUCCESS:
        return {
            ...state,
            smartSearchResults: payload
        };
    case SMART_SEARCH_FAILURE:
        return {
            ...state,
            smartSearchError: payload
        };
        case CLEAR_SMART_SEARCH:
            return {
                ...state,
                smartSearchResults:[],
                smartSearchError: null
            }
    default:
      return state;
  }
};
