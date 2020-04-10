import React from 'react';

const Operation = props => {

    const setOperation = () => {
        props.setOperation({
            isHidden:false,
            messageType:null
        })
    }

    return (
        <>
        {props.operation.messageType === 'reply' && (
            <input type="text" placeholder="To" name="to"/>
        )}
        {props.operation.messageType === 'replyall' && (
            <>
            <input type="text" placeholder="To" name="to"/>
            <input type="text" placeholder="CC" name="cc"/>
            </>
        )}
        {props.operation.messageType === 'forward' && (
            <input type="text" placeholder="Forward" name="to"/>
        )}
        <textarea>

        </textarea>
        <input type="button" value="Send" onClick={setOperation}/>
        <input type="button" value="Discard" onClick={setOperation}/>
        </>
    )
};

export default Operation;  