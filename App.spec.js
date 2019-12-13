import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppContainer from '.AppContainer';
import '@testing-library/jest-dom/extend-expect'

test('full app rendering/navigating', () => {
    const {container, getByText} = render(
        <Router>
         <AppContainer />
        </Router>
    )
    //verify page content for expected route
    expect(container.innerHTML).toMatch('Layou')
})