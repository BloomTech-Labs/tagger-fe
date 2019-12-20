/**
 * @jest-environment jsdom
 */
const React = require('react')
const Render = require('react-test-renderer')
const library = require('@testing-library/react')
const matched = require('@testing-library/jest-dom/extend-expect')

const help = require('./helpers')

afterEach(library.cleanup);

describe('sum function', () => {
    //This is a describe block. You can next them,
    //to group your tests

    //This is a test block. Note the test runner
    //is reporting a success. Not so soon!

    it('sums two intergers', () => {
        const expected = 4;
        const actual = help.sum(2,2)
        expect(actual).toBe(expected);
    })
})

it('renders without crashing', () => {
    const wrapper = library.render(
        <span className='greet'>hello world</span>
    );

    console.log(wrapper.debug())
    const element = wrapper.queryByText(/hello/i)
    expect(element).toBeTruthy();
    expect(element).toBeInTheDocument()
    expect(element).toBeVisible()
})