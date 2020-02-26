import React from "react";
import { withRouter } from "react-router-dom";

import styled from "styled-components";

const S = {
    Menu: styled.div`
    position:fixed;
    right: -200px;
    top: 64px;
    width:200px;
    height: calc(100vh - 64px);
    background-color: #c8dfe9;
    color:black;
    transition:0.3s;
    transform: ${(props) => props.transform};
    ul{
        width:100%;
        height:
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        li{
            height:25px;
            width:100%;
            text-align: left;
        }
    }
    `
};

export default function Menu(props) {
    function logout() {
        sessionStorage.clear("id_token");
    }

    return (
        <S.Menu transform={props.showMenu ? "translateX(-200px)" : ""}>
            <ul>
                <li>
                    <a href="#">Services</a>
                </li>
                <li>
                    <a href="#">Blog</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
                <li onClick={logout}>
                    <i class="fas fa-sign-out-alt"></i> Logout
                </li>
            </ul>
        </S.Menu>
    );
}
