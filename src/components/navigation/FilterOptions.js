import React, { useEffect } from "react";
import styled from "styled-components";

const S = {
    UL: styled.ul`
        width: 100%;
        border: solid grey 1px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0px;
        box-sizing: border-box;
        margin: 0px;
        background-color: white;
        div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            box-sizing: border-box;
            border-bottom: solid grey 1px;
            height: 30px;
            padding: 0px 5px;

            li {
                list-style: none;
            }
        }
    `
};

export default function FilterOptions(props) {
    const [options, handleCheckbox, useSmartOptions, smartOptions] = props.options;

    const keyList = useSmartOptions ? smartOptions : options;
    let optionsArray = Object.keys(keyList);
    useSmartOptions ? optionsArray.shift() : (optionsArray = optionsArray);
    let listItem = optionsArray.map((option, index) => {
        return (
            <div key={index} id={option} onClick={handleCheckbox}>
                {keyList[option] ? (
                    <i id={option} onClick={handleCheckbox} className="far fa-check-square"></i>
                ) : (
                    <i id={option} onClick={handleCheckbox} className="far fa-square"></i>
                )}
                <li name={option} id={option} value={keyList[option]} onClick={handleCheckbox}>
                    {option}
                </li>
            </div>
        );
    });

    return <S.UL action="">{listItem}</S.UL>;
}
