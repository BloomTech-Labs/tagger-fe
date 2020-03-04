import React from "react";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { smartSearch } from "../../actions/";

const S = {
    Button: styled.button`
        height: 20px;
        // width: 80px;
        background-color: white;
        color: blue;
        :hover {
            color: #2196f3;
            font-weight: 900;
            border-bottom: 1px solid #00000033;
            text-shadow: 0px 1px #2196f387;
            cursor: pointer;
        }
        :active {
            background: #9893613b;
            -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
            -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
            box-shadow: inset 0px 0px 5px #c1c1c1;
            outline: none;
            cursor: pointer;
        }
    `
};

function SmartButton(props) {
    const { message_id: uid, from, email_body_text: msg, subject } = props.thisEmail;
    const searchParams = { uid, from, msg, subject };

    const handleClick = () => {
        props.smartSearch(props.email, searchParams);
    };

    return <S.Button onClick={handleClick}>Find similar</S.Button>;
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
