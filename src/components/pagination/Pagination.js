import React from 'react';
import { connect } from 'react-redux';

import { nextPage, prevPage } from '../../actions';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = props => {

    const currentPage = props.pageNum;
    const lower = ((props.pageNum - 1) * 25) + 1;
    const higher = ((props.pageNum - 1) * 25) + 25;
    const pageCount = Math.floor(props.totalCount / 25)

    return (
        <div className="row pagination">
            <span>{lower}-{higher} of {props.totalCount}</span>
            <FontAwesomeIcon 
                icon={faAngleLeft} 
                id={currentPage === 1 && 'inactive'}
                onClick={() => props.prevPage(props.label,currentPage-1)}
            />
            {/* Total # of Emails */}
            <FontAwesomeIcon 
                icon={faAngleRight} 
                id={currentPage === pageCount && 'inactive'}
                onClick={() => props.nextPage(props.label,currentPage+1)}
            />
        </div>
    )
}

const mapStateToProps = ({ inbox }) => ({
    totalCount:inbox.totalCount,
    pageNum:inbox.pageNum,
    label:inbox.label
})

export default connect(mapStateToProps,{nextPage, prevPage})(Pagination); 