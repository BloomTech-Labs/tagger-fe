import React from 'react';


const EmailButtons = props => {

    const setOperation = e => {
        props.setOperation({
            isHidden: true,
            messageType: e.target.name
        })
    }

    return (
        <>
        <input type="button" value="Reply" name="reply" onClick={setOperation}/>
        <input type="button" value="Reply All" name="replyall" onClick={setOperation}/>
        <input type="button" value="Forward" name="forward" onClick={setOperation}/>
        </>
    )
}

export default EmailButtons; 