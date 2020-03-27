import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendEmail, changeIsComposing } from "../../actions/composerActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const Compose = (props) => {
    // this is the state for the email object that gets sent off using nodemailer on the backend
    const [email, setEmail] = useState({
        service: "gmail",
        host: "smtp.gmail.com",
        port: "465",
        userEmail: "taggerlabs20@gmail.com",
        token:props.token,
        receiver: "",
        subject: "",
        body: "",
        cc: "",
        bcc: ""

    });
// handles the input change for the input fields
    const handleChange = e => {

        setEmail({
            ...email,
            [e.target.name]: e.target.value
        });
    };
// invokes the sendEmail function brought in from ComposerActions.js 
    const handleSubmit = () => {
        console.log("PROPS", props);
        console.log(email, "Email")
        props.sendEmail(email, props.token);
    };
// toggles the isComposing state to not show the composing component
    const changeIsComposing = () => {
        props.changeIsComposing(!props.isComposing);
        //props.setIsCompose(false);
    };
    return (
        <>
        <div className="overlay">
        </div>
        <div className="compose-card col">
            <FontAwesomeIcon icon={faTimesCircle} className="close end" onClick={changeIsComposing}/>
            <input type="email" placeholder="To" name="receiver" id="receiver" value={email.receiver} onChange={handleChange} />
            <input type="email" placeholder="CC" name="cc" id="cc" value={email.cc} onChange={handleChange} />
            <input type="email" placeholder="BCC" name="bcc" id="bcc" value={email.bcc} onChange={handleChange} />
            <input type="text" placeholder="Subject" name="subject" id="subject" value={email.subject} onChange={handleChange} />
            <textarea
                type="text"
                name="body"
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
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Compose);
