import React from "react";
import Fuse from "fuse.js";
import { connect } from "react-redux";

var options = {
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["text", "from", "to", "uid", "subject", "tags"]
};

export const fuzzyFunction = (value, emails) => {
    let query = refineSearchParams(value);
    console.log(query, "\n\n\n HERE \n\n\n");
    var fuse = new Fuse(emails, query.Options);
    // console.log(emails, "emails from imap inside fuzzy");
    var result = fuse.search(query.SearchString);
    // console.log(result, "result from search");
    return result;
};

function refineSearchParams(string) {
    const newKeys = [];
    let useDefault = true;
    let refined = {
        Options: { ...options },
        SearchString: string
    };

    if (string.includes("<exact>")) {
        const regex = /<exact>/gi;
        refined = {
            ...refined,
            Options: {
                ...options,
                threshold: 0.0
            },
            SearchString: refined.SearchString.replace(regex, "")
        };
    }
    if (string.includes("<to>")) {
        newKeys.push("to");
        useDefault = false;
        const regex = /<to>/gi;
        refined = {
            ...refined,
            SearchString: refined.SearchString.replace(regex, "")
        };
    }
    if (string.includes("<from>")) {
        newKeys.push("from");
        useDefault = false;
        const regex = /<from>/gi;
        refined = {
            ...refined,
            SearchString: refined.SearchString.replace(regex, "")
        };
    }
    if (string.includes("<text>")) {
        newKeys.push("text");
        useDefault = false;
        const regex = /<text>/gi;
        refined = {
            ...refined,
            SearchString: refined.SearchString.replace(regex, "")
        };
    }
    if (string.includes("<subject>")) {
        newKeys.push("subject");
        useDefault = false;
        const regex = /<subject>/gi;
        refined = {
            ...refined,
            SearchString: refined.SearchString.replace(regex, "")
        };
    }

    let modifiedOptions = {
        ...refined,
        Options: {
            ...options,
            keys: newKeys
        }
    };

    return useDefault ? refined : modifiedOptions;
}
