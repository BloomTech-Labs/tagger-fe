import React from "react";
import Fuse from "fuse.js";
import { connect } from "react-redux";

var fuseOptions = {
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["text", "from", "to", "uid", "subject", "tags"]
};

export const fuzzyFunction = (value, filterArray, emails) => {
    let options = refineSearchParams(filterArray);
    var fuse = new Fuse(emails, options);
    var result = fuse.search(value);
    return result;
};

function refineSearchParams(filterArray) {
    const newKeys = filterArray;
    let useDefault = true;

    let refinedFuseOptions = {
        ...fuseOptions
    };

    if (newKeys.length > 0) {
        useDefault = false;
        refinedFuseOptions = {
            ...fuseOptions,
            keys: newKeys
        };
    }
    if (newKeys.includes("exact")) {
        refinedFuseOptions = {
            ...refinedFuseOptions,
            threshold: 0.0
        };
    }

    return useDefault ? fuseOptions : refinedFuseOptions;
}

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
