import React from 'react';
import { connect } from 'react-redux';
import ComposeButton from './ComposeButton';
import Folders from './Folders';
import Tags from './Tags';

const Sidebar = props => {
    
    return (
        <div className="sidebar col" id={props.sidebar ? 'slidebar' : null}>
            <ComposeButton setComposer={props.setComposer} />
            <Folders />
            <Tags />
        </div>
    );    
}

const mapStateToProps = ({sidebar}) => ({
    sidebar:sidebar.sliderbar
})

export default connect(mapStateToProps)(Sidebar);