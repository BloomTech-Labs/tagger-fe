import React, { useState } from "react";
import styled from "styled-components";

const Q = {
    Form: styled.form`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 80%;
        align-items: center;
        height: 100%;
        box-sizing: border-box;
        z-index: 1;
    `,
    Button: styled.button`
        display: none;
    `
    // Input: styled.input`
    //     height: 35px;
    //     border: 1px solid red;
    //     margin-bottom: 1px;
    //     background-color: lightgray;
    //     color: black;
    //     outline: none;
    //     width: 50vw;
    //     display: block;
    //     box-sizing: border-box;
    //     padding: 0px 2%;
    //     border: none;
    // `
};
export default function SmartSearchBar(props) {
    const [S] = props.S;
    const [smartState, setSmartState] = useState({
        msg: "",
        subject: "",
        from: ""
    });

    const handleChange = (e) => {
        e.persist();
        // console.log(e, "event from smart search bar");
        const name = e.target.name;
        const value = e.target.value;
        setSmartState({
            ...smartState,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.sendSearch(props.userEmail, smartState);
        setSmartState({
            msg: "",
            subject: "",
            from: ""
        });
        console.log("smartypants", smartState);
    };
    return (
        <Q.Form autoComplete="off" onSubmit={handleSubmit}>
            {props.smartOptions.msg === true ? (
                <S.SmartInput
                    type="text"
                    onChange={handleChange}
                    value={smartState.msg}
                    name="msg"
                    placeholder="Body"
                ></S.SmartInput>
            ) : null}

            {props.smartOptions.from === true ? (
                <S.SmartInput
                    type="text"
                    onChange={handleChange}
                    value={smartState.from}
                    name="from"
                    placeholder="From"
                ></S.SmartInput>
            ) : null}

            {props.smartOptions.subject === true ? (
                <S.SmartInput
                    type="text"
                    onChange={handleChange}
                    value={smartState.subject}
                    name="subject"
                    placeholder="Subject"
                ></S.SmartInput>
            ) : null}
            <Q.Button type="submit" />
        </Q.Form>
    );
}
