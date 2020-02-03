import React, { useState, useEffect } from "react";

const MessageTags = ({ labelIds }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        console.log("useEffect from MessageTags")
        fetchLabelNames(labelIds);
    }, [])

    const fetchLabelNames = (ids) => {
        console.log("fetchLabelNames from MessageTags")
        ids.map(id => {
            window.gapi.client.gmail.users.labels.get({
                id: id,
                userId: "me"
            })
            .then(res => {
                if (res.result.name.includes("tagger_") && tags) {
                    let name = res.result.name.substring(7);
                    setTags(tags => [ ...tags, name ]);
                }
            });
        })
    }

    return (
        <div className="tags-list">
            {tags.map(tag => {
                return (
                    <div 
                        key={tag}
                        className="tagger-tag email-tag"
                    >
                        {tag}
                    </div>
                )
            })}
        </div>
    )
}

export default MessageTags;