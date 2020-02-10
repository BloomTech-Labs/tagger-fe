import React from "react";
import Fuse from "fuse.js";
import { connect } from "react-redux";
import { saveSearch } from "../../actions";
var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["html", "text", "fromEmailAddress", "fromName", "subject"]
};

const fuzzySearch = (props) => {
    var fuse = new Fuse(props.emails, options);
    var result = fuse.search(props.searchQuery.search);

    props.saveSearch(result);
};

const mapStateToProps = ({ imap }) => ({
    emails: imap.emails
});

export default connect(mapStateToProps, { saveSearch })(fuzzySearch);
