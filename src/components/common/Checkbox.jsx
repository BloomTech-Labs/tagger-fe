import React, { useState, useEffect } from 'react';
import './checkbox.scss';

const Checkbox = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(!!props.checked)
  }, [props.checked])

  return (
    <label className="custom-control fill-checkbox">
      <input checked={isChecked} 
        type="checkbox" 
        onChange={props.onChange} 
        className="fill-control-input" 
      />
      <span className="fill-control-indicator" />
      {
        props.label ? (
          <span className="fill-control-description">
            {props.label}
          </span>
        ) : null
      }
    </label>
  )
}

export default Checkbox;
