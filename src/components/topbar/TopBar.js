import React from 'react';
import HamburgerButton from './HamburgerButton';
import Logo from './Logo';
import Logout from './Logout';
import Search from './Search';
//import SearchResults from './SearchResults';

const TopBar = () => {

    return(
        <div className="top row">
            <HamburgerButton />
            <Logo />
            <Search />
            <Logout />
        </div>
    )
}

export default TopBar;