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
    console.log(filterArray, "\n\n\n\n\n\n\n\n filter array");
    let options = refineSearchParams(filterArray);
    console.log(options, "\n\n\n HERE \n\n\n");
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
