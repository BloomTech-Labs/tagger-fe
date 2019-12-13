import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
// import "jest-dom/index-expect"
// import "react-testing-library/cleanup-after-each";
import GoogleButton from './Login'
import TestRenderer from 'react-test-renderer'
import {
    SIGNED_OUT,
    SIGNED_IN,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_IN_PROGRESS,
    AUTH_SIGNED_OUT
  } from "../constants"

afterEach(cleanup)

describe("<GoogleButton />", () => {
    it("renders google button", () => {
        const {getByText, debug} = render(<GoogleButton />);
        debug()
        getByText(/onClick/i);
    })
    
    // it("renders the display", () => {
    //     const { getByTestId } = render(<Dashboard />);
    //     const display = getByTestId("display");
    //     expect(display).toHaveClass("display panel");
    //   });

})