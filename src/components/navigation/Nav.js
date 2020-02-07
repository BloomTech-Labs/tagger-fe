import React from "react";
import styled from "styled-components";

const S = {};

S.Container = styled.div`
  border: solid black 1px;
  height: 64px;
`;

const Nav = props => {
  return <S.Container>Nav</S.Container>;
};

export default Nav;
