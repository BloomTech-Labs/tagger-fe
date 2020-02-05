import {

    SAMPLE_FUNCTION_START,
    SAMPLE_FUNCTION_SUCCESS,
    SAMPLE_FUNCTION_FAILURE,
    
} from "../actions/actions";

const initialState = {
    sampleState: true
};
  
export const userReducer = (state = initialState, action) => {
    switch (action.type) {

    // =========================================

    //               SAMPLE GROUP

        // case SAMPLE_FUNCTION_START:
        // return {
        //     ...state,
        // };
        case SAMPLE_FUNCTION_SUCCESS:
        console.log("Sample function reducer trigger")
        return {
            ...state,
            sampleState: !state.sampleState
        };
        // case SAMPLE_FUNCTION_FAILURE:
        // return {
        //     ...state,
        // };

    // =========================================

        default:
        return state;
    }
};