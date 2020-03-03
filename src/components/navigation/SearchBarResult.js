import React from "react";
import styled from "styled-components";
const moment = require("moment");

const S = {
    Result: styled.div`
        width: 99%;
        box-sizing: border-box;
        height: 50px;
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        background-color: ${(props) => props.simulateFocusBackgroundColor};
        border-left: ${(props) => props.simulateFocusBorder};
        :hover {
            background-color: #f0f8ffa6;
            border-left: 4px solid #0000ff99;
        }
        :active {
            background-color: #50becaad;
            text-shadow: 1px 0px 0px #000000a1;
        }
        i {
            height: 40px;
            width: 50px;
            margin: 0px 2px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .content {
            min-width: 70%;
            max-width: 70%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            .subject {
                min-width: 100%;
                max-width: 100%;
                height: 33%;
                overflow: hidden;
                white-space: nowrap;
                word-break: break-word;
                text-align: left;
                text-overflow: ellipsis;
                padding: 1px;
            }
            .body {
                min-width: 100%;
                max-width: 100%;
                height: 33%;
                overflow: hidden;
                white-space: nowrap;
                word-break: break-word;
                text-align: left;
                text-overflow: ellipsis;
                padding: 1px;
            }
            .participants {
                min-width: 100%;
                max-width: 100%;
                height: 33%;
                overflow: hidden;
                white-space: nowrap;
                word-break: break-word;
                text-align: left;
                text-overflow: ellipsis;
                padding: 1px;
                font-size: 0.8rem;
                letter-spacing: 1.5px;
                font-weight: 900;
                color: #17191dad;
            }
        }

        .date {
            height: 100%;
            width: 15%;
            display: flex;
            align-items: center;
            padding: 0 5px;
        }
    `
};
export default function SearchBarResult(props) {
    const [setShowSearchOptions, clearSearch, clearSmartSearch, setSearchQuery, searchQuery, emailToDisplayInThread, setIsDisplayingDropdown] = props.functions;
    function clearSearchAndLoadResult() {
        //todo add clear smart search results
        setShowSearchOptions(false)
        // clearSmartSearch();
        emailToDisplayInThread(props.email);

        // clearSearch();
        // setSearchQuery({
        //     ...searchQuery,
        //     search: ""
        // });
        setIsDisplayingDropdown(false)
    }

    function showDate() {
        let formatDate;
        if (typeof props.email.date === "string") {
            if (props.email.date.includes("T") || props.email.date.includes("-")) {
                formatDate = new Date(props.email.date);
            } else {
                formatDate = new Date(Number(props.email.date));
            }
        } else {
            formatDate = new Date(props.email.date);
        }

        let emailDateYear = moment(formatDate).format("YYYY");
        let currentYear = moment().format("YYYY");
        if (emailDateYear === currentYear) {
            return moment(formatDate).format("MMM Do");
        } else {
            return moment(formatDate).format("MMM Do YYYY");
        }
    }

    function showParticipants() {
        if (props.email.name === "") {
            return props.email.from;
        } else {
            return `${props.email.name}:(${props.email.from})`;
        }
    }
    return (
        <S.Result
            className="searchResult"
            key={props.email.message_id || props.key}
            onClick={clearSearchAndLoadResult}
            simulateFocusBackgroundColor={props.email.simulateFocus ? "#f0f8ffa6" : "none"}
            simulateFocusBorder={props.email.simulateFocus ? "4px solid #0000ff99" : "none"}
        >
            <i className="fa fa-envelope"></i>
            <section className="content">
                <div className="subject">{props.email.subject}</div>
                <div className="body">{props.email.email_body_text}</div>
                <div className="participants">{showParticipants()}</div>
            </section>
            <span className="date">
                <h4>{showDate()}</h4>
            </span>
        </S.Result>
    );
}
