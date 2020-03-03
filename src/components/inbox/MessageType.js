import React from "react";
import styled from "styled-components";

const S = {
    Form: styled.form`
        margin-top: 10px;
        width: 100px;
        height: 40px;
    `
};
export default function MessageType(props) {
    function selectResponseType(e) {
        props.setResponseType(e.target.value);
        // alert(props.responseType);
    }
    return (
        <S.Form title="Type of Response">
            <select
                value={props.responseType}
                onChange={selectResponseType}
                id="Email-Type"
                name="Response-Type"
            >
                <option value="Reply">Reply</option>
                <option value="Reply-All">Reply All</option>
                <option value="Forward">Forward</option>
            </select>
        </S.Form>
    );
}
