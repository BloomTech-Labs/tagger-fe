import React from 'react';


const EmailButtons = props => {

    const setOperation = e => {
        props.setOperation({
            isHidden: false,
            messageType: e.target.name
        })
    }

    return (
        <>
        <input type="button" value="Reply" name="reply" onClick={setOperation} className="btn email-ops"/>
        <input type="button" value="Reply All" name="replyall" onClick={setOperation} className="btn email-ops"/>
        <input type="button" value="Forward" name="forward" onClick={setOperation} className="btn email-ops"/>
        </>
    )
}

export default EmailButtons; 