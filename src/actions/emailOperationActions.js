export const SET_EMAIL_OPERATION = 'SET_EMAIL_OPERATION';

export const setEmailOperation = operation => dispatch => {
    dispatch({ type:SET_EMAIL_OPERATION, payload:operation });
}

export const DISCARD = 'DISCARD';

export const discard = () => dispatch => {
    dispatch({ type:DISCARD })
}