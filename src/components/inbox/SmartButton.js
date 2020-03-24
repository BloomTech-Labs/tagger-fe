import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { smartSearch } from "../../actions/";

function SmartButton(props) {
    const { message_id: uid, from, email_body_text: msg, subject } = props.thisEmail;
    const searchParams = { uid, from, msg, subject };

    const handleClick = () => {
        props.smartSearch(props.email, searchParams);
    };
    return <input type="button" onClick={handleClick} value="Find Similar" className="thread-similar" />;
}

const mapStateToProps = ({ user }) => ({
    email: user.emailAddress
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            smartSearch
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SmartButton);