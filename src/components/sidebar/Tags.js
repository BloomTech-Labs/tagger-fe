import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

const Tags = () => {

    return (
        <>
            <div className="tags">
                <li><FontAwesomeIcon icon={faTags} />Tags</li>
            </div>
            <ul>
            {/* {props.boxes.map((box, i) => {
            return (
                <li key={i} onClick={() => props.setSnippetFilter(`${box.name}`)}>
                {box.name}
                </li>
            );
            })} */}
            </ul>
        </>
    )
}

export default Tags;