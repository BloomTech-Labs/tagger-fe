import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { clearSearch, smartSearch } from "../../actions";
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
import { saveSearch,
     changeThreadContact,
     changeIsLoaded,
     clearSmartSearch,
     setIsDisplayingInSnippets,
     setIsDisplayingDropdown,
     saveStaticSearch
} from "../../actions";
import FuzzySearchBar from "./FuzzySearchBar";
import SmartSearchBar from "./SmartSearchBar";
import FilterOptions from "./FilterOptions";
import Menu from "./Menu";
import avatarPlaceholder from "../../images/avatarPlaceholder.png";
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
        height: 65%;
        div:focus-within {
            border: 2px solid #2f86ff;
        }
        // border: solid blue 3px;
        box-sizing: border-box;
    `,
    Top: styled.section`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        // border: solid red 3px;
        box-sizing: border-box;
    `,

    Form: styled.form`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 80%;
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
    SmartInput: styled.input`
        height: 50px;
        border: 3px solid #2f86ff;
        margin-bottom: 1px;
        background-color: lightgray;
        color: #2f86ff;
        outline: none;
        width: 100%;
        display: block;
        box-sizing: border-box;
        padding: 0px 2%;

        ::placeholder {
            color: #2f86ff;
        }
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
        width: 17%;
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
        justify-content: space-between;
        box-sizing: border-box;
        .left {
            width: 80%;
            // border: solid grey 3px;
            height: ${(props) => props.heightLeft};
            background-color: #cfcfd2;
            z-index: 2;
            // box-shadow: ${(props) => props.boxshadowLeft};
            box-sizing: border-box;
            border-radius: 0px 0px 10px 10px;
            overflow: hidden;

        }

        .right {
            width: 17%;
            height: ${(props) => props.heightRight};
            background-color: #cfcfd2;
            z-index: 2;
            // box-shadow: ${(props) => props.boxshadowRight};
            box-sizing: border-box;

        }
        // border: solid green 3px;
        box-sizing: border-box;


        
    `,
    SearchDropdown: styled.section`
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        // border: solid purple 3px;
        box-sizing: border-box;
    `,
    User: styled.div`
        height: 65%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    `,

    Avatar: styled.img`
        height: 100%;
        margin: 1px 2vw;
        border-radius: 50%;
        :hover {
            cursor: pointer;
        }
    `,
    SmartSearchToggle: styled.button`
        height: 65%;
        width: 10%;
        background-color: #2f86ff;
        color: white;
    `
};

const Nav = (props) => {
    const [searchQuery, setSearchQuery] = useState({
        search: "",
        filters: [],
        optionalFilter: [],
        results: [...props.results],
        position: -1 //used to highlight the current search result on up and down arrow key press
    });
    const [options, setOptions] = useState({
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
        msg: true,
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
        const filterName = searchQuery[`${whichFilter}`][index];
        currentFilters.splice(index, 1);
        setSearchQuery({
            ...searchQuery,
            [`${whichFilter}`]: currentFilters
        });
        setOptions({
            ...options,
            [filterName]: false
        });
        // =================== above reruns the display only
    }
    useEffect(() => {
        //=============below should rerun search logic
        console.log("ARE THESE ChANGING?", searchQuery.filters, searchQuery.optionalFilter)
        const emails = props.emails;
        if (searchQuery.optionalFilter.length > 0) {
            applyOptionalFilters([fuzzyFunction, searchQuery, emails, props.saveSearch]);
        } else {
            props.saveSearch(fuzzyFunction(searchQuery.search, searchQuery.filters, emails));
        }
    }, [searchQuery.filters, searchQuery.optionalFilter]);

    const dropDownDiv = document.querySelector("#dropDown");

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
        // if (name === "fuzzySearch" || name === "smartSearch") {
        //     setUseSmartOptions(!useSmartOptions);
        // } else
        if (useSmartOptions && name != "msg") {
            // if this thing is being checked true add that value to the string inside of the searchQuery.search
            // if this thing is being checked false, run the clear filters function
            setSmartOptions({
                ...smartOptions,
                [`${name}`]: !value
            });
        } else {
            // THIS SECTION APPLIES TO FUZZY SEARCH OPTIONS
            if (
                options[name] === true &&
                (name === "exact" ||
                    name === "to" ||
                    name === "body" ||
                    name === "name" ||
                    name === "from" ||
                    name === "subject")
            ) {
                let index = searchQuery.filters.indexOf(name);
                removeFilter(index, "filters");
            } else if (
                options[name] === true &&
                (name === ".com" ||
                    name === ".gov" ||
                    name === ".net" ||
                    name === ".edu" ||
                    name === ".org")
            ) {
                let index = searchQuery.optionalFilter.indexOf(name);
                removeFilter(index, "optionalFilter");
            } else if (options[name] === false) {
                setSearchQuery({
                    ...searchQuery,
                    search: searchQuery.search + name + ":"
                });
            }
            setOptions({
                ...options,
                [`${name}`]: !value
            });
        }
    };
    useEffect(() => {
        if (searchQuery.search.includes(":")) {
            const { string, filter, optional } = addSearchTag(
                searchQuery.search,
                searchQuery,
                options,
                setOptions
            );
            setSearchQuery({
                ...searchQuery,
                search: string,
                filters: [...searchQuery.filters, ...filter],
                optionalFilter: [...searchQuery.optionalFilter, ...optional]
            });
        }
    }, [searchQuery.search]);
    const handleInput = (e) => {
        // console.log(e, "EVENT \n\n\n****************");
        props.setIsDisplayingDropdown(true)
        e.persist();
        e.preventDefault();
        e.stopPropagation();
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const keyValue = e.nativeEvent.data;

        if (keyValue === ":") {
            const { string, filter, optional } = addSearchTag(
                value,
                searchQuery,
                options,
                setOptions
            );
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
            applyOptionalFilters([fuzzyFunction, searchQuery, emails, props.saveSearch]);
        } else {
            console.log("SAVE SEARCH IN NAV handleInput")
            props.saveSearch(fuzzyFunction(searchQuery.search, searchQuery.filters, emails));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.saveStaticSearch()
        console.log("Query position", searchQuery.position)
        if(searchQuery.position === -1){
            props.setIsDisplayingInSnippets(true)
            props.clearSmartSearch()
        } else {
            selectHighlightedEmail(searchQuery, setSearchQuery, emailToDisplayInThread);
        }
        props.setIsDisplayingDropdown(false)
    };
    const toggleSearchOptions = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowSearchOptions(!showSearchOptions);
    };
    const closeMenu = (event) => senseMenu(event, setshowMenu);
    const closeSearch = (event) => senseSearchBar(props, event, searchQuery, setSearchQuery);

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
                    {useSmartOptions ? (
                        <SmartSearchBar
                            smartOptions={smartOptions}
                            S={[S]}
                            sendSearch={props.smartSearch}
                            userEmail={props.userEmail}
                        />
                    ) : (
                        <FuzzySearchBar
                            functions={[removeFilter, handleInput, searchQuery, S, handleSubmit]}
                        />
                    )}

                    <S.Button onClick={toggleSearchOptions} className="filter">
                        Filters
                        {showSearchOptions ? (
                            <i className="fa fa-times filter"></i>
                        ) : (
                            <i className="fa fa-filter filter"></i>
                        )}
                    </S.Button>
                </S.Top>
                <S.Bottom
                    heightLeft={props.isDisplayingDropdown ? "330px" : "0px"}
                    boxshadowLeft={
                        props.isDisplayingDropdown ? "0px 0px 2px 1px #949494" : "none"
                    }
                    heightRight={showSearchOptions ? "initial" : "0px"}
                    boxshadowRight={showSearchOptions ? "0px 0px 2px 1px #949494" : "none"}
                >
                    <div className="left">
                        {props.results.length > 0 && props.isDisplayingDropdown ? (
                            <S.SearchDropdown
                                className="searchDropDown"
                                id="dropDown"
                                onMouseOver={() => {
                                    clearArrowHighlight(searchQuery, setSearchQuery);
                                }}
                            >
                                {" "}
                                {searchQuery.results.map((eachEmail, i) => {
                                    return (
                                        <SearchBarResult
                                            key={i}
                                            functions={[
                                                setShowSearchOptions,
                                                props.clearSmartSearch,
                                                props.clearSearch,
                                                setSearchQuery,
                                                searchQuery,
                                                emailToDisplayInThread,
                                                props.setIsDisplayingDropdown,
                                            ]}
                                            email={eachEmail}
                                        />
                                    );
                                })}
                            </S.SearchDropdown>
                        ) : null}
                    </div>
                    <div className="right filter">
                        {showSearchOptions ? (
                            <FilterOptions
                                options={[options, handleCheckbox, useSmartOptions, smartOptions]}
                            />
                        ) : null}
                    </div>
                </S.Bottom>
            </S.MidSection>
            <S.SmartSearchToggle
                onClick={() => {
                    setUseSmartOptions(!useSmartOptions);
                }}
            >
                Smart Search
            </S.SmartSearchToggle>

            <S.User>
                <S.Avatar
                    onClick={() => {
                        setshowMenu(!showMenu);
                    }}
                    src={props.userPhoto ? props.userPhoto : avatarPlaceholder}
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
        threadContactEmailAddress: inbox.threadContactEmailAddress,
        userEmail: user.emailAddress,
        smartResults: searchbar.smartSearchResults,
        isDisplayingDropdown: searchbar.isDisplayingDropdown
    };
}
export default connect(mapStateToProps, {
    clearSearch,
    saveSearch,
    changeThreadContact,
    changeIsLoaded,
    smartSearch,
    clearSmartSearch,
    setIsDisplayingInSnippets,
    setIsDisplayingDropdown,
    saveStaticSearch
})(Nav);
