import React, { useState } from "react";
import { connect } from "react-redux";
import { sendEmail, changeIsComposing } from "../../actions/composerActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const Compose = props => {
    // this is the state for the email object that gets sent off using nodemailer on the backend
     const [email, setEmail] = useState({
        from: "Tagger Labs<taggerlabs20@gmail.com>",
        to: "",
        subject: "",
        text: "",
        cc: "",
        bcc: ""
    });
// handles the input change for the input fields
    const handleChange = e => {
        setEmail({
            ...email,
            [e.target.name]: e.target.value
        });
    }
// invokes the sendEmail function brought in from ComposerActions.js 
    const handleSubmit = () => {
        console.log(email, "Email");
        props.sendEmail(email);
    };
// toggles the isComposing state to not show the composing component
    const changeIsComposing = () => {
        props.setComposer(false);
    };
    return (
        <>
        <div className="overlay">
        </div>
        <div className="compose-card col">
            <FontAwesomeIcon icon={faTimesCircle} className="close end" onClick={changeIsComposing}/>
            <input type="email" placeholder="To" name="to" id="receiver" value={email.receiver} onChange={handleChange} />
            <input type="email" placeholder="CC" name="cc" id="cc" value={email.cc} onChange={handleChange} />
            <input type="email" placeholder="BCC" name="bcc" id="bcc" value={email.bcc} onChange={handleChange} />
            <input type="text" placeholder="Subject" name="subject" id="subject" value={email.subject} onChange={handleChange} />
            <textarea
                type="text"
                name="text"
                id="body"
                value={email.body}
                onChange={handleChange}
            >
            </textarea>
            <div className="row end">
                <input type="button" value="Send" className="btn send end" onClick={handleSubmit} />
                <input type="button" value="Discard" className="btn discard end" onClick={changeIsComposing} />
            </div>
        </div>
        </>
    );
};

const mapStateToProps = ({ composer }) => ({
    isComposing: composer.isComposing
});
const mapDispatchToProps = {
    sendEmail,
    changeIsComposing
};

export default connect(mapStateToProps,mapDispatchToProps)(Compose);