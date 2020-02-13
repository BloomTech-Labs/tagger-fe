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
    keys: ["text", "from", "to", "uid", "subject", "tags"]
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
    if (string.includes("body:") && !searchQuery.filters.includes("body")) {
        const regex = /body:/gi;
        string = string.replace(regex, "");
        keyFilter.push("body");
    }
    let results = { string: string, filter: keyFilter };
    return results;
}
