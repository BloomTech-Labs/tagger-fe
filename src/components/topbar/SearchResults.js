import React from 'react';
import { connect } from 'react-redux';
import ShowDate from '../../utils/ShowDate';

const SearchResults = props => {

    return (
        <div className="left">
            <div className="search-keyword row">
                <span className="search-type">Keyword:</span>{props.keyword} 
            </div>
            <div>
            {props.search.map(result => (
                <div className="search-email row">
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

export default connect(mapStateToProps)(SearchResults);