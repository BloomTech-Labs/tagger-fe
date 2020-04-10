import React, { useState } from 'react';
import EmailBody from './EmailBody';
import EmailButtons from './EmailButtons';
import EmailOperations from './EmailOperations';
import Operations from './Operations';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

const EmailSection = props => {

    const [ operation, setOperation ] = useState(
        {
            isHidden: false,
            messageType: null
        }
    );

    const setContact = () => {

    }

    return(
        <SimpleBar forceVisible="y" autoHide={true} style={{height:'100%'}}>
            <div className="thread-window">
                <div className="thread-head row">
                    <div className="thread-contact row btn">
                        <FontAwesomeIcon icon={faUserCircle} onClick={() => setContact()} className="thread-avatar" />
                    </div>
                    <div className="thread-actions row">
                        <EmailOperations />
                    </div>
                </div>
                <h2>Subject Line</h2> {/*props.email.subject*/}
                <EmailBody />
                {operation.isHidden ? (
                    <Operations setOperation={setOperation} operation={operation} />
                ) : (
                    <EmailButtons setOperation={setOperation} />
                )}
            </div>
        </SimpleBar>
    );
}

export default EmailSection;