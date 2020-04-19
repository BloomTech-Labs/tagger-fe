import React from 'react';
import { connect } from 'react-redux';
import { viewEmail, hideResults } from '../../actions';
import ShowDate from '../../utils/ShowDate';

const SearchResults = props => {

    const handleEmailResults = (id) => {
        props.viewEmail(id);
        props.hideResults()
    }

    return (
        <div className="left" id="search-results">
            <div className="search-keyword row">
                <span className="search-type">Keyword:</span>{props.keyword} 
            </div>
            <div>
            {props.search.map(result => (
                <div className="search-email row" key={result.id} onClick={() => handleEmailResults(result.id)}>
                    <span className="search-type">Email:</span>
                    <div className="email-content col">
                        <div className="search-email-subject">{result.subject}</div>
                        <div className="search-email-body">{result.email_body_text}</div>
                    </div>
                    <div className="search-date">{ShowDate(result.date)}</div>
                </div>
            ))}
            </div>
        </div>
    );
}

const mapStateToProps = ({search}) => ({
    search:search.result,
    keyword:search.keyword
})

export default connect(mapStateToProps,{viewEmail, hideResults})(SearchResults);