import axios from "axios";


let local = false;
let cors = "https://cors-anywhere.herokuapp.com/"; // prefixing an endpoint URL with this negates CORS issues

//+++++++++++++++++++++++++++++++++++++++++++
//  F O R   D E V E L O P M E N T  O N L Y
//*******************************************
local = true; //<- uncomment for local development
cors = "";    //<- uncomment for local development
//+++++++++++++++++++++++++++++++++++++++++++

let url;
if (local) {
  url = "http://localhost:8000/";
} else {
  url = "deployed backend root URL here";
}






export const SAMPLE_FUNCTION_START = "SAMPLE_FUNCTION_START";
export const SAMPLE_FUNCTION_SUCCESS = "SAMPLE_FUNCTION_SUCCESS";
export const SAMPLE_FUNCTION_FAILURE = "SAMPLE_FUNCTION_FAILURE";

export const sampleFunction = (sampleId) => dispatch => {
    console.log("Sample function action trigger")
    // dispatch({ type: SAMPLE_FUNCTION_START, payload: {sampleKey: "sampleValue"} });
    dispatch({ type: SAMPLE_FUNCTION_SUCCESS, payload: {sampleKey: "sampleValue"} });
    // dispatch({ type: SAMPLE_FUNCTION_FAILURE, payload: {sampleKey: "sampleValue"} });
};


// =============================================================================

// PROMISE EXAMPLE______________________________________________________________

// export const sampleFunction = (sampleId) => dispatch => {
//   axios
//     .delete(`${url}api/emails/${sampleId}`, sampleId)

//     .then(res => {
//       dispatch({ type: SAMPLE_FUNCTION_SUCCESS, payload: res.data });
//       console.log(res.data);
//     })

//     .catch(err => {
//       console.log(err.response);
//       dispatch({ type: SAMPLE_FUNCTION_FAILURE });
//     });

//   console.log(sampleVar);
// };
