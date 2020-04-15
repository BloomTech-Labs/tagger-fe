import React from 'react';
import { connect } from 'react-redux';
import { setEmailOperation } from '../../actions'

const EmailButtons = props => {

    return (
        <>
        <input type="button" value="Reply" name="reply" onClick={() => props.setEmailOperation('reply')} className="btn email-ops"/>
        <input type="button" value="Reply All" name="replyall" onClick={() => props.setEmailOperation('replyall')} className="btn email-ops"/>
        <input type="button" value="Forward" name="forward" onClick={() => props.setEmailOperation('forward')} className="btn email-ops"/>
        </>
    )
}

export default connect(null,{setEmailOperation})(EmailButtons); 