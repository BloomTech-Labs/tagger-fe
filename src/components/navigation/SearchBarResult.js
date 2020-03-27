import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

// Testing by Milo
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import {
    changeIsLoaded,
    changeThreadContact,
    setBackButton
} from "../../actions";

const moment = require("moment");

const SearchBarResult = props => {

    const [setShowSearchOptions, emailToDisplayInThread, setIsDisplayingDropdown] = props.functions; // removed by Milo clearSearch, clearSmartSearch, setSearchQuery, searchQuery

    function clearSearchAndLoadResult(e) {
        e.stopPropagation();
        console.log('SEARCH RESULT CLICKED')
        //todo add clear smart search results
        setShowSearchOptions(false);
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

    // Testing by Milo
    const setThreadContact = () => {
        console.log('SEARCH RESULT CLICKED')
        const emailObj = props.email;
        emailObj.email_body === "false" || emailObj.email_body === "0"
            ? props.changeIsLoaded(true)
            : props.changeIsLoaded(false);
        props.changeThreadContact(emailObj);
        setIsDisplayingDropdown(false);
        props.setBackButton(true)
    };

    return (
        <div className="search-result row"
            key={props.email.message_id || props.key}
            //onClick={clearSearchAndLoadResult} ORIGINAL
            onClick={setThreadContact}
        >
            <span className="envelope">
                <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <section className="search-result-content col">
                <div className="search-result-subject">{props.email.subject}</div>
                <div className="search-result-body">{props.email.email_body_text}</div>
                <div className="search-result-participants">{showParticipants()}</div>
            </section>
            <span className="search-result-date">
                <h4>{showDate()}</h4>
            </span>            
        </div>
    );
}

//export default SearchBarResult;

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            changeThreadContact,
            changeIsLoaded,
            setBackButton
        },
        dispatch
    );

export default compose(withRouter, connect(null,mapDispatchToProps))(SearchBarResult);