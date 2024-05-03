import React, { useState } from "react";
import styled from "styled-components";
const HeaderDiv = styled.div`
  grid-column: 1/3;
  position: sticky;
  top: 0;
  background-color: var(--primary);
  color: white;
  padding: 10px;
  text-align: center;
`;
const ModeSwitch = styled.div`
  width: 60px;
  height: 70%;
  border: 1px solid;
  position: absolute;
  right: 10px;
  bottom: 15%;
  border-radius: 30px;
  background-color: black;
  transition: background-color 0.3s;

  &::before {
    content: "Mode";
    position: absolute;
    left: -50px;
    bottom: 10%;
  }

  @media (max-width: 500px) {
    &::before {
      display: none;
    }
  }

  & div {
    width: 25px;
    height: 25px;
    background-color: var(--tertiary);
    border-radius: 50%;
    position: absolute;
    top: 4%;
    left: ${(props) => (props.$mode ? "2px;" : "calc(100% - 26px)")};
    transition: left 0.5s, background-color 0.5s;
  }
`;
function Header() {
  const [mode, setMode] = useState(1);

  const modeHandler = () => {
    setMode((prevMode) => {
      const root = document.querySelector(":root");
      if (!prevMode) {
        root.style.setProperty("--primary", "#051923");
        root.style.setProperty("--secondary", "#2f5368");
        root.style.setProperty("--tertiary", "#607084");
      } else {
        root.style.setProperty("--primary", "#3e0430");
        root.style.setProperty("--secondary", "#66004c");
        root.style.setProperty("--tertiary", "#762f60");
      }
      return !prevMode;
    });
  };
  return (
    <HeaderDiv>
      Anime Tracker
      <ModeSwitch $mode={mode} onClick={modeHandler}>
        <div />
      </ModeSwitch>
    </HeaderDiv>
  );
}

export default Header;
