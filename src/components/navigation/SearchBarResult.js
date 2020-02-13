import React from "react";
import styled from "styled-components";

const S = {
    Result: styled.div`
    width:100%;
    height: 50px;
    display: flex;
    align-items: center;
    i{
        height:40px;
        width:40px;
        margin: 0 10px;
    };
    .content{
        min-width:70%;
        max-width:70%;
        height:100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .subject{
            display:flex;
            justify-content: flex-start;
            flex-wrap: no-wrap;
            min-width:100%
            max-width:100%;
            height:50%;
            overflow:hidden;
        };
        .body{
            display:flex;
            justify-content: flex-start;
            flex-wrap: no-wrap;
            min-width:100%;
            max-width:100%;
            height:50%;
            overflow:hidden;
        };
    };

    .date{
        height:100%;
        width: 10%;
        display: flex;
        align-items: center;
        padding: 0 5px;
    }

    `
};
export default function SearchBarResult(props) {
    const [clearSearch, setSearchQuery, searchQuery] = props.functions;
    function clearSearchAndLoadResult() {
        clearSearch();
        setSearchQuery({
            ...searchQuery,
            search: ""
        });
    }

    return (
        <S.Result key={props.email.message_id || props.key} onClick={clearSearchAndLoadResult}>
            <i class="fa fa-envelope"></i>
            <section className="content">
                <div className="subject">{props.email.subject}</div>
                <div className="body">{props.email.text}</div>
            </section>
            <span className="date">
                <h4>{props.date ? props.date : Date.now()}</h4>
            </span>
        </S.Result>
    );
}
