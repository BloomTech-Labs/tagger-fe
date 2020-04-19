import React from 'react';
import SearchResults from './SearchResults';

import { connect } from 'react-redux';
import { searchKeyword, hideResults} from '../../actions';

const Search = props => {

    const handleChange = e => {
        if (e.target.value.length === 0){
            props.hideResults()
            return
        }
        props.searchKeyword(e.target.value)
    }
    const handleBlur = () => {
        setTimeout(() => {
            props.hideResults()
        },1000)
    }

    return(
        <>
        <div className="nav-mid">
            <div className="search">
                <input name="search" placeholder='Search Contacts and Emails' onChange={handleChange} onBlur={handleBlur}/> {/* onBlur={handleBlur} */}
                {!props.resultIsHidden ? <SearchResults /> : null}
            </div>
        </div>
        </>
    );
}

const mapStateToProps = ({ search }) => ({
    resultIsHidden:search.isHidden
})

export default connect(mapStateToProps,{searchKeyword, hideResults})(Search);