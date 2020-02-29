import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { clearSearch } from "../../actions";
import SearchBarResult from "./SearchBarResult";
import {
    fuzzyFunction,
    addSearchTag,
    clearArrowHighlight,
    arrowDown,
    arrowUp,
    senseMenu,
    senseSearchBar,
    selectHighlightedEmail,
    applyOptionalFilters
} from "./navUtils";
import { saveSearch, changeThreadContact, changeIsLoaded } from "../../actions";
// import FilterButton from "./FilterButton";
import FuzzySearchDisplay from "./FuzzySearchDisplay";
import FilterOptions from "./FilterOptions";
import Menu from "./Menu";
const S = {
    Container: styled.div`
        height: 64px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        font-size: 0.9rem;
        border-bottom: solid #e0e0e0 1px;
    `,
    Header: styled.h1`
        font-size: 1.8rem;
        color: #2f86ff;
        margin: 8px 2vw;
        font-weight: bolder;
    `,
    MidSection: styled.div`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 60vw;
        height: 35px;
        div:focus-within {
            border: 2px solid #2f86ff;
        }
    `,
    Top: styled.section`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
    `,

    Form: styled.form`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 60vw;
        align-items: center;
        height: 100%;
        box-sizing: border-box;
    `,

    Search: styled.div`
        display: flex;
        align-items: center;
        background: lightgray;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    `,

    Input: styled.input`
        height: 100%;
        background-color: lightgray;
        color: black;
        outline: none;
        width: 50vw;
        display: block;
        box-sizing: border-box;
        padding: 0px 2%;
        border: none;
    `,
    Magnify: styled.button`
        margin: 2px;
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 20px;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0px 20px;
        z-index: 2;
        height: 100%;
    `,
    Button: styled.button`
        height: 100%;
        min-width: 100px;
        width: 10vw;
        border: solid lightgray 2px;
        border-radius: 3px;
        color: gray;
        background-color: white;

        :hover {
            cursor: pointer;
        }
        :active {
            background: #9893613b;
            -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
            -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
            box-shadow: inset 0px 0px 5px #c1c1c1;
            outline: none;
            cursor: pointer;
        }
    `,
    Bottom: styled.section`
        height: 0px;
        width: 100%;
        overflow: visible;
        display: flex;
        .left {
            width: 100%;
            height: ${(props) => props.heightLeft};
            background-color: #cfcfd2;
            z-index: 2;
            box-shadow: ${(props) => props.boxshadowLeft};
        }

        .right {
            width: 10vw;
            height: ${(props) => props.heightRight};
            background-color: #cfcfd2;
            z-index: 2;
            box-shadow: ${(props) => props.boxshadowRight};
        }
    `,
    SearchDropdown: styled.section`
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
    `,
    User: styled.div`
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    `,

    Avatar: styled.img`
        height: 40px;
        margin: 1px 2vw;
        border-radius: 50%;
        :hover {
            cursor: pointer;
        }
    `
};

const Nav = (props) => {
    const [searchQuery, setSearchQuery] = useState({
        search: "",
        filters: [],
        optionalFilter: [],
        results: [...props.results],
        position: -1
    });
    const [options, setOptions] = useState({
        fuzzySearch: true,
        smartSearch: false,
        exact: false,
        to: false,
        body: false,
        name: false,
        from: false,
        subject: false,

        ".com": false,
        ".gov": false,
        ".net": false,
        ".edu": false,
        ".org": false
    });
    const [smartOptions, setSmartOptions] = useState({
        fuzzySearch: false,
        smartSearch: true,
        msg: false,
        from: false,
        subject: false
    });
    const [showSearchOptions, setShowSearchOptions] = useState(false); // when you click button next to searchbar
    const [useSmartOptions, setUseSmartOptions] = useState(false);
    const [showMenu, setshowMenu] = useState(false); // when you click avatar
    useEffect(() => {
        let addSimulatedFocusProperty = props.results.map((eachObj) => {
            return {
                ...eachObj,
                simulateFocus: false
            };
        });
        setSearchQuery({
            ...searchQuery,
            results: addSimulatedFocusProperty,
            position: -1
        });
    }, [props.results]);

    function removeFilter(index, whichFilter) {
        const currentFilters = [...searchQuery[`${whichFilter}`]];
        currentFilters.splice(index, 1);
        setSearchQuery({
            ...searchQuery,
            [`${whichFilter}`]: currentFilters
        });
        // =================== above reruns the display only
    }
    useEffect(() => {
        //=============below should rerun search logic

        const emails = props.emails;
        if (searchQuery.optionalFilter.length > 0) {
            applyOptionalFilters(fuzzyFunction, searchQuery, emails, props.saveSearch);
        } else {
            props.saveSearch(fuzzyFunction(searchQuery.search, searchQuery.filters, emails));
        }
    }, [searchQuery.filters, searchQuery.optionalFilter]);

    let dropDownDiv = document.querySelector("#dropDown");

    const handleArrowSelect = (e) => {
        // console.log("ON KEYDOWN\n\n", e, "\n\n***************");
        if (e.key === "ArrowDown") {
            arrowDown(searchQuery, setSearchQuery, dropDownDiv);
        } else if (e.key === "ArrowUp") {
            arrowUp(searchQuery, setSearchQuery, dropDownDiv);
        }
    };

    const handleCheckbox = (e) => {
        e.persist();
        e.preventDefault();
        e.stopPropagation();
        // console.log(e, "handleCheckbox");
        const name = e.target.id;
        const keyList = useSmartOptions ? smartOptions : options;
        const value = keyList[name];
        if (name === "fuzzySearch" || name === "smartSearch") {
            setUseSmartOptions(!useSmartOptions);
        } else if (useSmartOptions) {
            setSmartOptions({
                ...smartOptions,
                [`${name}`]: !value
            });
        } else {
            setOptions({
                ...options,
                [`${name}`]: !value
            });
        }
    };

    const handleInput = (e) => {
        console.log(e, "EVENT \n\n\n****************");
        e.persist();
        e.preventDefault();
        e.stopPropagation();
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        const keyValue = e.nativeEvent.data;

        if (keyValue === ":") {
            const { string, filter, optional } = addSearchTag(value, searchQuery);
            setSearchQuery({
                ...searchQuery,
                [name]: string,
                filters: [...searchQuery.filters, ...filter],
                optionalFilter: [...searchQuery.optionalFilter, ...optional]
            });
        } else {
            setSearchQuery({
                ...searchQuery,
                [name]: value
            });
        }

        const emails = props.emails;
        if (searchQuery.search.length === 0) {
            props.clearSearch();
        } else if (searchQuery.optionalFilter.length > 0) {
            applyOptionalFilters(fuzzyFunction, searchQuery, emails, props.saveSearch);
        } else {
            props.saveSearch(fuzzyFunction(searchQuery.search, searchQuery.filters, emails));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        selectHighlightedEmail(searchQuery, setSearchQuery, emailToDisplayInThread);
    };
    const toggleSearchOptions = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowSearchOptions(!showSearchOptions);
    };
    const closeMenu = (event) => senseMenu(event, setshowMenu);
    const closeSearch = (event) => senseSearchBar(event, searchQuery, setSearchQuery);

    useEffect(() => {
        document.addEventListener("keydown", handleArrowSelect);
        document.addEventListener("mouseup", closeMenu);
        document.addEventListener("mouseup", closeSearch);
        return () => {
            document.removeEventListener("keydown", handleArrowSelect);
            document.removeEventListener("mouseup", closeMenu);
            document.removeEventListener("mouseup", closeSearch);
        };
    }, [searchQuery]);

    function emailToDisplayInThread(emailObj) {
        emailObj.email_body === "false" || emailObj.email_body === "0"
            ? props.changeIsLoaded(true)
            : props.changeIsLoaded(false);
        props.changeThreadContact(emailObj);
    }
    return (
        <S.Container>
            <S.Header>Tagger</S.Header>
            <S.MidSection>
                <S.Top>
                    {useSmartOptions ? null : (
                        <FuzzySearchDisplay
                            functions={[removeFilter, handleInput, searchQuery, S, handleSubmit]}
                        />
                    )}

                    <S.Button onClick={toggleSearchOptions}>
                        Filters
                        {showSearchOptions ? (
                            <i className="fa fa-times"></i>
                        ) : (
                            <i className="fa fa-filter"></i>
                        )}
                    </S.Button>
                </S.Top>
                <S.Bottom
                    heightLeft={searchQuery.search.length > 0 ? "330px" : "0px"}
                    boxshadowLeft={
                        searchQuery.search.length > 0 ? "0px 0px 2px 1px #4c4c4c" : "none"
                    }
                    heightRight={showSearchOptions ? "300px" : "0px"}
                    boxshadowRight={showSearchOptions ? "0px 0px 2px 1px #4c4c4c" : "none"}
                >
                    <div className="left">
                        {props.results.length > 0 && searchQuery.search.length > 0 ? (
                            <S.SearchDropdown
                                className="searchDropDown"
                                id="dropDown"
                                onMouseOver={() => {
                                    clearArrowHighlight(searchQuery, setSearchQuery);
                                }}
                            >
                                {searchQuery.results.map((eachEmail, i) => {
                                    return (
                                        <SearchBarResult
                                            key={i}
                                            functions={[
                                                props.clearSearch,
                                                setSearchQuery,
                                                searchQuery,
                                                emailToDisplayInThread
                                            ]}
                                            email={eachEmail}
                                        />
                                    );
                                })}
                            </S.SearchDropdown>
                        ) : null}
                    </div>
                    <div className="right">
                        {showSearchOptions ? (
                            <FilterOptions
                                options={[options, handleCheckbox, useSmartOptions, smartOptions]}
                            />
                        ) : null}
                    </div>
                </S.Bottom>
            </S.MidSection>
            <S.User>
                <S.Avatar
                    onClick={() => {
                        setshowMenu(!showMenu);
                    }}
                    src={
                        props.userPhoto
                            ? props.userPhoto
                            : "data:image/png;base64,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"
                    }
                    alt="Avatar"
                />
                <Menu showMenu={showMenu} setshowMenu={setshowMenu} />
            </S.User>
        </S.Container>
    );
};
function mapStateToProps({ searchbar, imap, user, inbox }) {
    return {
        results: searchbar.searchResults,
        emails: imap.emails,
        userPhoto: user.userPhotoUrl,
        threadContactEmailAddress: inbox.threadContactEmailAddress
    };
}
export default connect(mapStateToProps, {
    clearSearch,
    saveSearch,
    changeThreadContact,
    changeIsLoaded
})(Nav);
