import React from 'react';
import SearchResults from './SearchResults';

import { connect } from 'react-redux';
import { searchKeyword, hideResults} from '../../actions';

const Search = props => {

    const handleChange = e => {
        console.log("LENGTH", e.target.value.length)
        if (e.target.value.length === 0){
            props.hideResults()
            return
        }
        props.searchKeyword(e.target.value)
    }
    const handleBlur = () => {
        props.hideResults()
    }

    return(
        <>
        <div className="nav-mid">
            <div className="search">
                <input name="search" placeholder='Search Contacts and Emails' onChange={handleChange} onBlur={handleBlur} />
                {!props.resultIsHidden && <SearchResults />}
            </div>
        </div>
        </>
    );
}

const mapStateToProps = ({ search }) => ({
    resultIsHidden:search.isHidden
})

export default connect(mapStateToProps,{searchKeyword, hideResults})(Search);