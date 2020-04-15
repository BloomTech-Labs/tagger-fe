import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Search = () => {

    const [ keyword, setKeyword ] = useState(null)

    const handleChange = e => {
        setKeyword(e.target.value)
    }

    useEffect(() => {
        Axios.post('https://tagger-be-dev.herokuapp.com/emails/search', keyword)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },[keyword])

    console.log(keyword)

    return(
        <div className="row nav-mid">
            <input name="search" placeholder='Search Contacts and Emails' onChange={handleChange} />
        </div>
    );
}

export default Search;