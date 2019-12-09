/**
 * @jest-environment jsdom
 */
const React = require('react');
const Render = require('react-test-renderer');
const rtl = require('@testing-library/react');
const matched = require('@testing-library/jest-dom/extend-expect');
// import Header from './components/header/Header.jsx';
// const Header = require('./components/header/Header');


const help = require('./helpers');

afterEach(rtl.cleanup);

describe('sum function', () => {
  // This is a describe block. You can nest them,
  // to group your tests


     // This is a test block. Note the test runner
     // is reporting a success. Not so soon!
     // This test is not done.
  it('sums two integers', () => {
    const expected = 3;
    const actual = help.sum(1, 2);
    expect(actual).toBe(expected); // .toBe() looks for strict equality!
  });
}); 

it('renders without crashing', () => {
    const wrapper = rtl.render(
      <span className="greet">hello world</span>
    );
    console.log(wrapper.debug());
    const element = wrapper.queryByText(/hello/i);
    expect(element).toBeTruthy(); // jest matcher
    expect(element).toBeInTheDocument(); // jest-dom matcher
    expect(element).toBeVisible(); // jest-dom matcher
  });

  



//write some fake business logic into this file if I need it. test the expected value for that made-up example. import functions from my other files if needed. 

// import {toggle} from './components/main/Main';

// describe('toggles between dashboards', () => {
//     it('toggle is false by default', () => {
//         expect(toggle).toBe(false);
//     });
// });



