import React from "react";
import styled from "styled-components";

const S = {
    Button: styled.div`
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 70%;
        min-width: 100px;
        max-width: ${(props) => props.length};
        background-color: #f8f8f8;
        box-sizing: content-box;
        margin: 0 5px;
        border-width: 1px;
        border-style: solid;
        border-color: #a6a6a6;
        border-radius: 10px;
        padding: 0px 4px 0px 10px;
        overflow: hidden;
    `
};
export default function FilterButton(props) {
    function calculatePx(string) {
        const num = Math.floor(6.8 * string.length + 15);
        return `${num}px`;
    }
    return (
        <S.Button length={calculatePx(props.text)}>
            {props.text}
            <i
                className="fa fa-times-circle"
                onClick={() => {
                    props.remove(props.index);
                }}
            />
        </S.Button>
    );
}
