import React from 'react';
import { connect } from 'react-redux';
import { setSimilarEmail } from '../../actions';

const SimilarButton = props => {

    const handleSimilar = (id) => {
        //console.log(props.viewemail)
        props.setSimilarEmail(id)
    }

    return (
        <>
        <input type="button" onClick={() => handleSimilar(props.viewemail.gmThreadID)} value="Similar Emails" className="thread-similar" />
        </>
    )
}

const mapStateToProps = ({ viewEmail }) => ({
    viewemail:viewEmail.viewemail
})

export default connect(mapStateToProps,{setSimilarEmail})(SimilarButton);