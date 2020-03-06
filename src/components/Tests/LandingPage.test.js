import React from "react"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

import LandingPage from "../landing/LandingPage"

test(`landing page`, () => {
    const landingPage = shallow(<LandingPage />);
    expect(toJson(landingPage)).toMatchSnapshot()
})