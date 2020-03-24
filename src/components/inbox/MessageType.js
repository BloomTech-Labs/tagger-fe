import React, { useState, useEffect }from "react";
// import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
// import {faUserCirle, faReply, faReplyall, faShareSquare, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawsome";
// import Reply from './Reply';
// import Replyall from './ReplyAll';

export default function MessageType(props) {
    const [reply, setReply ] = useState();
    const [forward, setForward] = useState();

    function selectResponseType(e) {
        props.setResponseType(e.target.value);
        // alert(props.responseType);
    }
    return (
        <form title="Type of Response">
            <select
                value={props.responseType}
                onChange={selectResponseType}
                id="Email-Type"
                name="Response-Type"
            >
                <option value="Reply">Reply</option>
                <option value="Reply-All">Reply All</option>
                <option value="Forward">Forward</option>
            </select>
        </form>
    );
}
