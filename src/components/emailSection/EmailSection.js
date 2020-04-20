import React from 'react';
import { connect } from 'react-redux';
import { setAnalyticsBar, setAnalyticsBarContact } from '../../actions'
import EmailButtons from './EmailButtons';
import EmailOperations from './EmailOperations';
import Operations from './Operations';
import Single from './Single';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

import { makeHtmlSafe } from "../inbox/helpers/MessageHelper";

const EmailSection = props => {

    const handleAnalyticsBar = (email) => {
        props.setAnalyticsBar(!props.analyticsBar)
        props.setAnalyticsBarContact(email)
    }

    return(
        props.viewemail !== undefined && (
            <SimpleBar forceVisible="y" autoHide={true} style={{height:'100%'}}>
                <div className="thread-window">
                    <div className="thread-head row">
                        <div className="thread-contact row btn">
                            <FontAwesomeIcon icon={faUserCircle} onClick={() => handleAnalyticsBar(props.viewemail.from)} className="thread-avatar" />
                            <h3>{props.viewemail.name}</h3>
                        </div>
                        <div className="thread-actions row">
                            <EmailOperations />
                        </div>
                    </div>
                    <h2>{props.viewemail.subject}</h2> {/*props.email.subject*/}
                    {!props.isThread ? (
                        <div 
                            className="thread-message"
                            dangerouslySetInnerHTML={{ __html: makeHtmlSafe(props.viewemail.email_body) }} 
                        />
                    ) : (
                        props.viewemail.map(email => (
                            <Single email_body={email.email_body} />
                        ))
                    )}
                    
                    {props.isHidden ? (
                        <EmailButtons />
                        ) : (
                        <Operations />
                    )}
                </div>
            </SimpleBar>
        )
    );
}

const mapStateToProps = ({ viewEmail, operation }) => ({
    viewemail:viewEmail.viewemail,
    messageType:operation.messageType,
    isHidden:operation.isHidden,
    isThread:viewEmail.isThread
})

export default connect(mapStateToProps, {setAnalyticsBar, setAnalyticsBarContact})(EmailSection);