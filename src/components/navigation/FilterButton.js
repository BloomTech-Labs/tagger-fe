import React from "react";
import styled from "styled-components";

const S = {
    Button: styled.span`
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 70%;
        width: 80px;
        background-color: rgba(48, 133, 253, 0.65);
        box-sizing: content-box;
        margin: 0 5px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(232, 232, 232);
        border-radius: 10px;
        padding: 0px 4px 0px 10px;
        overflow: hidden;
    `
};
export default function FilterButton(props) {
    return (
        <S.Button>
            {props.text}
            <i className="fa fa-times-circle searchBar" onClick={props.onClick} />
        </S.Button>
    );
}
