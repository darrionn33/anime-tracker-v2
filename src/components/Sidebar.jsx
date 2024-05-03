import React from "react";
import styled from "styled-components";

const SidebarDiv = styled.div`
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  @media (max-width: 650px) {
    display: none;
  }

  & > button {
    width: 90%;
    height: 40px;
    border-radius: 20px;
    font-size: larger;
    background-color: #2c993a;
    color: white;
    border: none;
  }
`;

const Divider = styled.div`
  width: 70%;
  height: 2px;
  background-color: rgba(66, 66, 66, 0.215);
  margin: 20px 0;
`;

const Filter = styled.div`
  display: grid;
  grid-template-columns: 15px 1fr;
  gap: 5px;
  align-self: self-start;

  & > h3 {
    grid-column: 1/3;
    margin-bottom: 10px;
  }
  & > input[type="radio"] {
    accent-color: var(--primary);
  }
`;

function Sidebar(props) {
  const setFilter = (filter) => {
    props.setFilter(filter);
  };
  const showSearch = () => {
    props.setModal([true, 0]);
  };
  return (
    <SidebarDiv>
      <button id="new" onClick={showSearch}>
        +
      </button>
      <Divider />
      <Filter>
        <h3>Filter</h3>
        <input
          type="radio"
          name="type"
          id="All"
          defaultChecked
          onChange={(e) => setFilter(e.target.id)}
        />
        <label htmlFor="All">All</label>
        <input
          type="radio"
          name="type"
          id="Anime"
          onChange={(e) => setFilter(e.target.id)}
        />
        <label htmlFor="Anime">Anime</label>
        <input
          type="radio"
          name="type"
          id="Manga"
          onChange={(e) => setFilter(e.target.id)}
        />
        <label htmlFor="Manga">Manga</label>
        <input
          type="radio"
          name="type"
          id="Manhwa"
          onChange={(e) => setFilter(e.target.id)}
        />
        <label htmlFor="Manhwa">Manhwa</label>
      </Filter>
    </SidebarDiv>
  );
}

export default Sidebar;
