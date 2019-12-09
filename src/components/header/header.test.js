const React = require('react');
const Render = require('react-test-renderer');
const rtl = require('@testing-library/react');
const matched = require('@testing-library/jest-dom/extend-expect');
import Header from './Header';
// const Header = require('./Header');

//  https://github.com/facebook/jest/issues/6229
// ^^maybe this will help?
// https://www.robinwieruch.de/react-testing-jest
// ^^I like this walkthrough
// https://www.sitepoint.com/test-react-components-jest/
// ^^another good walkthrough


afterEach(rtl.cleanup);

describe('test header', () => {
    it ('looks for the Tagger text', () => {
        console.log("nope");
    })
});