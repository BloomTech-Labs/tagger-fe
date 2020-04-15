import React from 'react';
import { connect } from 'react-redux';
import { discard } from '../../actions';

const Operation = props => {

    return (
        <>
        {props.messageType === 'reply' && (
            <input type="text" placeholder="To" name="to"/>
        )}
        {props.messageType === 'replyall' && (
            <>
            <input type="text" placeholder="To" name="to"/>
            <input type="text" placeholder="CC" name="cc"/>
            </>
        )}
        {props.messageType === 'forward' && (
            <input type="text" placeholder="Forward" name="to"/>
        )}
        <textarea>

        </textarea>
        <input type="button" value="Send" className="btn send"/>
        <input type="button" value="Discard" onClick={() => props.discard()} className='btn discard'/>
        </>
    )
};

const mapStateToProps = ({ operation }) => ({
    messageType:operation.messageType,
    isHidden:operation.isHidden
})

export default connect(mapStateToProps,{discard})(Operation);  