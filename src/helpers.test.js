/**
 * @jest-environment jsdom
 */

const React = require('react');
const Render = require('react-test-renderer');
const rtl = require('@testing-library/react');
const matched = require('@testing-library/jest-dom/extend-expect');

//import Header from './components/header/Header.jsx;
//const Header = require('./components/header/Header');

const help = require('./helpers')

afterEach(rtl.cleanup);

describe('sum function', () => {
    //This is a describe block. You can next them,
    //to group your tests

    //This is a test block. Note the test runner
    //is reporting a success. Not so soon!

    it('sums two intergers', () => {
        constexpected = 4;
        const actual = help.sum(2,2)
        expect(actual).toBe(expected);
    })
})

it('renders without crashing', () => {
    const wrapper = rtl.render(
        <span className='greet'>hello world</span>
    );

    console.log(wrapper.debug())
    const element = wrapper.queryByText(/hello/i)
    expect(element).toBeTruthy();
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
})

