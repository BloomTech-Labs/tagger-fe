// import React from 'react';
// import renderer from 'react-test-renderer';
const React = require('react');
const Render = require('react-test-renderer');
import {toggle} from './components/main/Main';

const help = require('./helpers');


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


//write some fake business logic into this file if I need it. test the expected value for that made-up example. import functions from my other files if needed. 

describe('toggles between dashboards', () => {
    it('toggle is false by default', () => {
        expect(toggle).toBe(false);
    });
});