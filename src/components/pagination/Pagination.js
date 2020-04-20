import React from 'react';
import { connect } from 'react-redux';
import { nextPage, prevPage } from '../../actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = props => {

    const currentPage = props.pageNum;
    const lower = ((props.pageNum - 1) * 25) + 1;
    let higher = ((props.pageNum - 1) * 25) + 25;
    if (higher > props.totalCount){
        higher = props.totalCount
    }
    const pageCount = Math.ceil(props.totalCount / 25)

    const handlePrev = () => {
        if(currentPage > 1) {
            props.prevPage(props.label, currentPage-1,props.isSearch)
        }
    }

    const handleNext = () => {
        console.log('HANDLE NEXT LABEL', props.label)
        if(currentPage < pageCount) {
            props.nextPage(props.label,currentPage+1,props.isSearch)
        }
    }

    return (
        <div className="row pagination">
            <span>{lower}-{higher} of {props.totalCount}</span>
            <FontAwesomeIcon 
                icon={faAngleLeft} 
                id={currentPage === 1 && 'inactive'}
                onClick={() => handlePrev()}
            />
            <FontAwesomeIcon 
                icon={faAngleRight} 
                id={currentPage === pageCount ? 'inactive' : null}
                onClick={() => handleNext()}
            />
        </div>
    )
}

const mapStateToProps = ({ inbox }) => ({
    totalCount:inbox.totalCount,
    pageNum:inbox.pageNum,
    label:inbox.label,
    isSearch:inbox.isSearch
})

export default connect(mapStateToProps,{nextPage, prevPage})(Pagination); 