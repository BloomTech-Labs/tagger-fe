import React from "react "


const Bars = props => {

    return (
        <div style={{width:"100%"}} className='barwidth'>
            <span className="num">{props.totalEmails}</span> {/* added props temporarily */}
        </div>
    )
}

export default Bars; 