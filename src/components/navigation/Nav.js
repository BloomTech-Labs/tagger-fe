import React, { useState, useEffect } from "react";
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
     saveStaticSearch,
     setSliding
} from "../../actions";
import FuzzySearchBar from "./FuzzySearchBar";
import SmartSearchBar from "./SmartSearchBar";
import FilterOptions from "./FilterOptions";
import Menu from "./Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
        if (useSmartOptions && name !== "msg") {
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
        props.setIsDisplayingDropdown(true);
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
            console.log("SAVE SEARCH IN NAV handleInput");
            props.saveSearch(fuzzyFunction(searchQuery.search, searchQuery.filters, emails));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.saveStaticSearch();
        console.log("Query position", searchQuery.position);
        if(searchQuery.position === -1){
            props.setIsDisplayingInSnippets(true);
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
        console.log('emailToDisplayInThread CLICKED')
        emailObj.email_body === "false" || emailObj.email_body === "0"
            ? props.changeIsLoaded(true)
            : props.changeIsLoaded(false);
        props.changeThreadContact(emailObj);
    }


    const handleSlidebar = () => {
        props.setSliding(!props.slidebar)
        console.log('slidebar is', props.slidebar)
    }

    return (
        <div className="top row">
            <div className="sidebar-btn btn" onClick={handleSlidebar}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className="logo">
                <h1>Tagger</h1>
            </div>
            <div className="nav-mid">
                <section className="row">
                    {useSmartOptions ? (
                        <SmartSearchBar
                            smartOptions={smartOptions}
                            // S={[S]}
                            sendSearch={props.smartSearch}
                            userEmail={props.userEmail}
                        />
                    ) : (
                        <FuzzySearchBar
                            functions={[removeFilter, handleInput, searchQuery, handleSubmit]}
                        />
                    )}

                    <button onClick={toggleSearchOptions} className="filter">
                        Filters
                        {showSearchOptions ? (
                            <i className="fa fa-times filter"></i>
                        ) : (
                            <i className="fa fa-filter filter"></i>
                        )}
                    </button>
                </section>
                <section>
                    <div className="left">
                        
                        {props.results.length > 0 && props.isDisplayingDropdown ? (
                            <section
                                className="searchDropDown"
                                id="dropDown"
                                onMouseOver={() => {
                                    clearArrowHighlight(searchQuery, setSearchQuery);
                                }}
                            >
                                
                                {" "}
                                {searchQuery.results.map((eachEmail, i) => {
                                    return (
                                        <>
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
                                        </>
                                    );
                                })}
                            </section>
                        ) : null}
                        
                    </div>
                    <div className="right filter">
                        {showSearchOptions ? (
                            <FilterOptions
                                options={[options, handleCheckbox, useSmartOptions, smartOptions]}
                            />
                        ) : null}
                    </div>
                </section>
            </div>
            <button className="smart-search-btn"
                onClick={() => {
                    setUseSmartOptions(!useSmartOptions);
                }}
            >
                Smart Search
            </button>

            <Menu showMenu={showMenu} setshowMenu={setshowMenu} />
            {/* <div className="user-avatar">
                <img
                    onClick={() => {
                        setshowMenu(!showMenu);
                    }}
                    src={props.userPhoto ? props.userPhoto : avatarPlaceholder}
                    alt="Avatar"
                />
                <Menu showMenu={showMenu} setshowMenu={setshowMenu} />
            </div> */}
        </div>
    );
};
function mapStateToProps({ searchbar, imap, user, inbox}) {
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
    saveStaticSearch,
    setSliding
})(Nav);
