import React from "react";
import Fuse from "fuse.js";
import { connect } from "react-redux";

var options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "html",
    "text",
    "from",
    "message_id",
    "subject",
    "tags",
    "fromName",
    "fromEmailAddress"
  ]
};

export const fuzzyFunction = (value, emails) => {
  var fuse = new Fuse(emails, options);
  console.log(emails, "emails from imap inside fuzzy");
  var result = fuse.search(value);
  console.log(result, "result from search");
  return result;
};

// const mapStateToProps = ({ imap }) => ({
//     emails: imap.emails
// });

// export default connect(mapStateToProps, { saveSearch })(fuzzyFunction);
