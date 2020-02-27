import React from "react";
import Fuse from "fuse.js";
import { connect } from "react-redux";

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
export function addSearchTag(str, searchQuery) {
    let string = str;
    let keyFilter = [];
    let optionalFilter = [];

    if (string.includes(".com:") && !searchQuery.optionalFilter.includes(".com:")) {
        const regex = /.com:/gi;
        string = string.replace(regex, "");
        optionalFilter.push(".com");
    }
    if (string.includes(".net:") && !searchQuery.optionalFilter.includes(".net:")) {
        const regex = /.net:/gi;
        string = string.replace(regex, "");
        optionalFilter.push(".net");
    }
    if (string.includes(".org:") && !searchQuery.optionalFilter.includes(".org:")) {
        const regex = /.org:/gi;
        string = string.replace(regex, "");
        optionalFilter.push(".org");
    }
    if (string.includes(".edu:") && !searchQuery.optionalFilter.includes(".edu:")) {
        const regex = /.edu:/gi;
        string = string.replace(regex, "");
        optionalFilter.push(".edu");
    }
    if (string.includes(".gov:") && !searchQuery.optionalFilter.includes(".gov:")) {
        const regex = /.gov:/gi;
        string = string.replace(regex, "");
        optionalFilter.push(".gov");
    }
    // ===========================================
    // Below are fuzzy search filters
    if (string.includes("exact:") && !searchQuery.filters.includes("exact")) {
        const regex = /exact:/gi;
        string = string.replace(regex, "");
        keyFilter.push("exact");
    }
    if (string.includes("to:") && !searchQuery.filters.includes("to")) {
        const regex = /to:/gi;
        string = string.replace(regex, "");
        keyFilter.push("to");
    }
    if (string.includes("from:") && !searchQuery.filters.includes("from")) {
        const regex = /from:/gi;
        string = string.replace(regex, "");
        keyFilter.push("from");
    }
    if (string.includes("subject:") && !searchQuery.filters.includes("subject")) {
        const regex = /subject:/gi;
        string = string.replace(regex, "");
        keyFilter.push("subject");
    }
    if (string.includes("name:") && !searchQuery.filters.includes("name")) {
        const regex = /name:/gi;
        string = string.replace(regex, "");
        keyFilter.push("name");
    }
    if (string.includes("body:") && !searchQuery.filters.includes("email_body_text")) {
        const regex = /body:/gi;
        string = string.replace(regex, "");
        keyFilter.push("email_body_text");
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
    if (event.toElement.className.includes("menu")) {
        return null;
    } else if (event.target.className.includes("menu")) {
        return null;
    } else if (event.target.offsetParent.className.includes("menu")) {
        return null;
    } else {
        setshowMenu(false);
    }
}
export function senseSearchBar(event, searchQuery, setSearchQuery) {
    if (
        event.toElement.parentNode.className.includes("searchBar") ||
        event.toElement.className.includes("left") ||
        event.toElement.parentNode.parentNode.className.includes("searchResult")
    ) {
        return null;
    } else {
        // console.log(event);
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
