import React from 'react';
import { connect } from 'react-redux';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Card from './Card';

const List = props => {
    
    const toggleIsComposing = () => {
        props.setComposer(true)
    }

    return (
        props.emails !== undefined && (
        <SimpleBar forceVisible="y" autoHide={true} style={{height:'100%'}}>
        {props.emails.map(email => {
            return (
                <Card key={email.id} email={email} />
            );
        })}
        <div className="compose-circle-btn btn" onClick={toggleIsComposing}>+</div>
        </SimpleBar>
        )
    )
    // if (props.emails !== undefined && !props.changeListing) {

    //     return (
    //         <SimpleBar forceVisible="y" autoHide={true} style={{height:'100%'}}>
    //         {props.emails.map(email => {
    //             return (
    //                 <Card key={email.id} email={email} />
    //             );
    //         })}
    //         <div className="compose-circle-btn btn" onClick={toggleIsComposing}>+</div>
    //         </SimpleBar>
    //     );

    // } else if (props.changeListing) {
    //     return (
    //         <SimpleBar forceVisible="y" autoHide={true} style={{height:'100%'}}>
    //         {props.searchResults.map(email => {
    //             return (
    //                 <Card key={email.id} email={email} />
    //             );
    //         })}
    //         <div className="compose-circle-btn btn" onClick={toggleIsComposing}>+</div>
    //         </SimpleBar>
    //     );
    // }
}

const mapStateToProps = ({ inbox, search }) => ({
    emails:inbox.emails,
    changeListing: search.changeListing,
    searchResults: search.result,
    isSearch:inbox.isSearch
})

export default connect(mapStateToProps)(List);