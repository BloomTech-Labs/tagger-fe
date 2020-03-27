import React from "react";

export default function FilterButton(props) {
    return (
        <span>
            {props.text}
            <i className="fa fa-times-circle searchBar" onClick={props.onClick} />
        </span>
    );
}
