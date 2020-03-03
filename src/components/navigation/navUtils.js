import React from "react";
import Fuse from "fuse.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {setIsDisplayingDropdown} from "../../actions"

var fuseOptions = {
    //options generated at fusejs.io interactive testing tool
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "from", "to", "email_body_text", "subject"]
};

// fuzzyFunction is the core function call for use of fusejs dependency
export const fuzzyFunction = (value, filterArray, emails) => {
    let options = refineSearchParams(filterArray);
    var fuse = new Fuse(emails, options);
    var result = fuse.search(value);
    return result;
};

// refineSearchParams 1.) checks to see if the default keys array in the options (above) should be used
// 2.) if exact is a key set the threshold for the search to be 0.0 which indicates no tolerance which enables exact searching
function refineSearchParams(filterArray) {
    const newKeys = [...filterArray];
    if (newKeys.includes("body")) {
        let bodyIndex = newKeys.indexOf("body");
        newKeys.splice(bodyIndex, 1, "email_body_text");
    }
    let useDefault = true;

    let refinedFuseOptions = {
        ...fuseOptions
    };

    if (newKeys.includes("exact")) {
        refinedFuseOptions = {
            ...refinedFuseOptions,
            threshold: 0.0
        };
        if (newKeys.length === 1) {
            return refinedFuseOptions;
        }
    }

    if (newKeys.length > 0) {
        useDefault = false;
        refinedFuseOptions = {
            ...fuseOptions,
            keys: newKeys
        };
    }

    return useDefault ? fuseOptions : refinedFuseOptions;
}

// addSearchTag checks the inputfield value for key markers such as to:  and  exact: and:
// 1.) removes them from the string if they have not been added to use state hook in nav ie: searchQuery.filters
// 2.) returns a list of strings to add to the filters array in nav
export function addSearchTag(str, searchQuery, options, setOpt) {
    let string = str;
    let keyFilter = [];
    let optionalFilter = [];

    if (string.includes(".com:") && !searchQuery.optionalFilter.includes(".com:")) {
        const regex = /.com:/gi;
        string = string.replace(regex, "");
        optionalFilter.push(".com");
        setOpt({ ...options, [".com"]: true });
    }
    if (string.includes(".net:") && !searchQuery.optionalFilter.includes(".net:")) {
        const regex = /.net:/gi;
        string = string.replace(regex, "");
        optionalFilter.push(".net");
        setOpt({ ...options, [".net"]: true });
    }
    if (string.includes(".org:") && !searchQuery.optionalFilter.includes(".org:")) {
        const regex = /.org:/gi;
        string = string.replace(regex, "");
        optionalFilter.push(".org");
        setOpt({ ...options, [".org"]: true });
    }
    if (string.includes(".edu:") && !searchQuery.optionalFilter.includes(".edu:")) {
        const regex = /.edu:/gi;
        string = string.replace(regex, "");
        optionalFilter.push(".edu");
        setOpt({ ...options, [".edu"]: true });
    }
    if (string.includes(".gov:") && !searchQuery.optionalFilter.includes(".gov:")) {
        const regex = /.gov:/gi;
        string = string.replace(regex, "");
        optionalFilter.push(".gov");
        setOpt({ ...options, [".gov"]: true });
    }
    // ===========================================
    // Below are fuzzy search filters
    if (string.includes("exact:") && !searchQuery.filters.includes("exact")) {
        const regex = /exact:/gi;
        string = string.replace(regex, "");
        keyFilter.push("exact");
        setOpt({ ...options, ["exact"]: true });
    }
    if (string.includes("to:") && !searchQuery.filters.includes("to")) {
        const regex = /to:/gi;
        string = string.replace(regex, "");
        keyFilter.push("to");
        setOpt({ ...options, ["to"]: true });
    }
    if (string.includes("from:") && !searchQuery.filters.includes("from")) {
        const regex = /from:/gi;
        string = string.replace(regex, "");
        keyFilter.push("from");
        setOpt({ ...options, ["from"]: true });
    }
    if (string.includes("subject:") && !searchQuery.filters.includes("subject")) {
        const regex = /subject:/gi;
        string = string.replace(regex, "");
        keyFilter.push("subject");
        setOpt({ ...options, ["subject"]: true });
    }
    if (string.includes("name:") && !searchQuery.filters.includes("name")) {
        const regex = /name:/gi;
        string = string.replace(regex, "");
        keyFilter.push("name");
        setOpt({ ...options, ["name"]: true });
    }
    if (string.includes("body:") && !searchQuery.filters.includes("email_body_text")) {
        const regex = /body:/gi;
        string = string.replace(regex, "");
        keyFilter.push("body");
        setOpt({ ...options, ["body"]: true });
    }
    let results = {
        string: string,
        filter: keyFilter,
        optional: optionalFilter
    };
    return results;
}

export function clearArrowHighlight(searchQuery, setSearchQuery) {
    let arrayCopy = [...searchQuery.results];
    let current = searchQuery.position;
    let next = searchQuery.position + 1;
    let previous = searchQuery.position - 1;
    arrayCopy[current] = {
        ...arrayCopy[current],
        simulateFocus: false
    };
    arrayCopy[next] = {
        ...arrayCopy[next],
        simulateFocus: false
    };
    arrayCopy[previous] = {
        ...arrayCopy[next],
        simulateFocus: false
    };

    setSearchQuery({
        ...searchQuery,
        position: -1,
        results: [...arrayCopy]
    });
}

export function arrowDown(searchQuery, setSearchQuery, dropDownDiv) {
    if (searchQuery.results.length - 1 === searchQuery.position) {
        return null;
    } else if (searchQuery.position === -1) {
        let arrayCopy = [...searchQuery.results];
        let next = searchQuery.position + 1;
        arrayCopy[next] = {
            ...arrayCopy[next],
            simulateFocus: true
        };
        setSearchQuery({
            ...searchQuery,
            position: next,
            results: [...arrayCopy]
        });
    } else {
        let arrayCopy = [...searchQuery.results];
        let current = searchQuery.position;
        let next = searchQuery.position + 1;

        if ((searchQuery.position + 1) % 6 === 0 && searchQuery.position > 0) {
            dropDownDiv.scrollTop += 330;
        }

        arrayCopy[current] = {
            ...arrayCopy[current],
            simulateFocus: false
        };
        arrayCopy[next] = {
            ...arrayCopy[next],
            simulateFocus: true
        };

        setSearchQuery({
            ...searchQuery,
            position: next,
            results: [...arrayCopy]
        });
    }
}

export function arrowUp(searchQuery, setSearchQuery, dropDownDiv) {
    if (searchQuery.position === -1 || searchQuery.position === 0) {
        return null;
    } else {
        let arrayCopy = [...searchQuery.results];
        let current = searchQuery.position;
        let previous = searchQuery.position - 1;

        if (searchQuery.position % 6 === 0 && searchQuery.position > 0) {
            dropDownDiv.scrollTop -= 330;
        }

        arrayCopy[current] = {
            ...arrayCopy[current],
            simulateFocus: false
        };
        arrayCopy[previous] = {
            ...arrayCopy[previous],
            simulateFocus: true
        };
        setSearchQuery({
            ...searchQuery,
            position: previous,
            results: [...arrayCopy]
        });
    }
}

export function senseMenu(event, setshowMenu) {
    if (event.target.className.includes("menu")) {
        return null;
    } else if (event.target.className.includes("menu")) {
        return null;
    } else if (event.target.offsetParent.className.includes("menu")) {
        return null;
    } else {
        setshowMenu(false);
    }
}
export function senseSearchBar(props, event, searchQuery, setSearchQuery) {
    console.log(event, "\n\n mousedown for sense searchbar \n\n");
    if (
        event.target.className.includes("filter") ||
        event.target.parentNode.parentNode.parentNode.className.includes("filter") ||
        event.target.className.includes("searchBar") ||
        event.target.parentNode.className.includes("searchBar") ||
        event.target.className.includes("left") ||
        event.target.parentNode.className.includes("searchResult") ||
        event.target.parentNode.parentNode.className.includes("searchResult")
    ) {
        return null;
    } else {
        props.setIsDisplayingDropdown(false)
        setSearchQuery({
            ...searchQuery,
            // search: "",
            position: -1
        });
    }
}
// function senseSearchBarFunc(props, event, searchQuery, setSearchQuery) {
//     props.setIsDisplayingDropdown(false)
//     console.log(event, "\n\n mousedown for sense searchbar \n\n");
//     props.setIsDisplayingDropdown(false)
//     if (
//         event.target.className.includes("filter") ||
//         event.target.parentNode.parentNode.parentNode.className.includes("filter") ||
//         event.target.className.includes("searchBar") ||
//         event.target.parentNode.className.includes("searchBar") ||
//         event.target.className.includes("left") ||
//         event.target.parentNode.className.includes("searchResult") ||
//         event.target.parentNode.parentNode.className.includes("searchResult")
//     ) {
//         return null;
//     } else {
//         setSearchQuery({
//             ...searchQuery,
//             // search: "",
//             position: -1
//         });
//     }
// }

// const mapStateToProps = () => ({

// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             setIsDisplayingDropdown
//         },
//         dispatch
//     );

// export const senseSearchBar = connect(mapStateToProps)(senseSearchBarFunc);




export function selectHighlightedEmail(searchQuery, setSearchQuery, emailToDisplayInThread) {
    if (searchQuery.position === -1) {
        return null;
    } else if (searchQuery.position >= 0) {
        emailToDisplayInThread(searchQuery.results[searchQuery.position]);
        setSearchQuery({
            ...searchQuery,
            search: "",
            filters: [],
            optionalFilter: [],
            results: [],
            position: -1
        });
    }
}

export function applyOptionalFilters(array) {
    const [fuzzyFunction, searchQuery, emails, saveSearch] = array;

    let baseFuzzyResults = fuzzyFunction(searchQuery.search, searchQuery.filters, emails);
    let addOptionalFilters = baseFuzzyResults.filter((eachEmail) => {
        for (let index = 0; index < searchQuery.optionalFilter.length; index++) {
            if (eachEmail.from.includes(searchQuery.optionalFilter[index])) {
                return eachEmail;
            } else if (eachEmail.to && eachEmail.to.includes(searchQuery.optionalFilter[index])) {
                return eachEmail;
            }
        }
    });
    saveSearch(addOptionalFilters);
}
