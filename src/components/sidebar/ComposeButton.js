import React from 'react';

const ComposeButton = props => {

    const toggleIsComposing = () => {
        props.setComposer(true)
    }

    return (
        <input type="button" className="compose btn" onClick={toggleIsComposing} value="Compose" />
    )
}

export default ComposeButton;