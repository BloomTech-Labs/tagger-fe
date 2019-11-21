import React, { useState } from "react";
import "./tagsList.scss";

const TagsList = () => {
    const [active, setActive] = useState(null);

    const handleTabClick = (tag) => {
        setActive(tag);
    }

    const tags = ['Personal', 'Finance', 'Security', 'Productivity', 'Social', 'Promotions', 'Shopping'];

    return (
        <div className="tags-container">
            {tags.map((tag, index) => {
                if (active === tag) {
                    return (
                        <div className="tag-tab active" tabIndex={index}>
                            {tag}
                        </div>
                    )
                }
                return (
                    <div className="tag-tab" tabIndex={index} onClick={() => handleTabClick(tag)}>
                        {tag}
                    </div>
                )
            })}
        </div>
    )
}

export default TagsList;