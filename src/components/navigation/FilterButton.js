import React from "react";
import styled from "styled-components";

const S = {
    Button: styled.span`
        height: 90%;
        width: 80px;
        background-color: rgb(250, 250, 250);
        box-sizing: content-box;
        margin: 2px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(232, 232, 232);
        border-radius: 2px;
        padding: 0px 4px 0px 10px;
        overflow: hidden;
    `
};

export default function FilterButton(props) {
    return (
        <span>
            {props.text}
            <i
                class="far fa-times-circle"
                onClick={() => {
                    props.remove(props.index);
                }}
            />
        </span>
    );
}
