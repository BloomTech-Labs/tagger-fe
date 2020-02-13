import React from "react";
import styled from "styled-components";

const S = {
  Result: styled.div`
    width:100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .fas fa-envelope{
        height:40px;
        width:40px;
    };
    .content{
        width:40%
        height:100%;
        display: flex;
        flex-direction: column;
        .subject{
            width:100%
            height:50%;
        };
        .body{
            width:100%;
            height:50%;
        };
    };

    .date{
        height:100%;
        width: 10%;
        display: flex;
        align-items: center;
    }

    `
};
export default function SearchBarResult(props) {
  return (
    <S.Result key={props.email.message_id || props.key}>
      <i class="fas fa-envelope"></i>
      <section className="content">
        <div className="subject">{props.email.subject}</div>
        <div className="body">{props.email.text}</div>
      </section>
      <span className="date">
        <h4>{props.date ? props.date : Date.now()}</h4>
      </span>
    </S.Result>
  );
}
