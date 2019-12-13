import React from "react";


const Signout = (props) => {

  return <div title="Sign out of Gmail" onClick={props.onSignout} className='signout-btn btn bg-white text-dark ml-auto'>Sign Out</div>;
}

export default Signout;
