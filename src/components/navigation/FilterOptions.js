import React, { useEffect } from "react";
import styled from "styled-components";

const S = {
    UL: styled.ul`
        width: 100%;
        border: solid brown 3px;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-left: 5px;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 0px;

        div {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            box-sizing: border-box;
            li {
                padding-left: 5px;
                list-style: none;
            }
        }
    `
};

export default function FilterOptions(props) {
    const [options, handleCheckbox, useSmartOptions, smartOptions] = props.options;
    const keyList = useSmartOptions ? smartOptions : options;
    let optionsArray = Object.keys(keyList);
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
