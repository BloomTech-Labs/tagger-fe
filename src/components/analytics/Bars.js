import React from 'react';

const Bars = props => {

    return (
        <div style={{width:"100%"}} className='barwidth'>
            <span className="num">{props.count}</span> {/* added props temporarily */}
        </div>
    )
}
export default Bars;