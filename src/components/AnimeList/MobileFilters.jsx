import React from "react";
import styled from "styled-components";

const Filter = styled.div`
  display: none;
  justify-content: center;
  gap: 5px;

  @media (max-width: 650px) {
    display: flex;
  }

  & > input[type="radio"] {
    display: none;
  }
  & > input[type="radio"]:checked + label {
    filter: saturate(1);
  }
`;

const Labels = styled.label`
  background-color: ${(props) =>
    props.className == "Anime"
      ? "#8e2d7a"
      : props.className == "Manga"
      ? "#f97a5d"
      : props.className == "Manhwa"
      ? "#00c857"
      : "inherit"};

  color: white;
  font-size: small;
  padding: 10px 20px;
  border-radius: 25px;
  filter: saturate(0);
  display: flex;
  align-items: center;
  &:nth-child(2) {
    background-color: var(--primary);
  }
`;
function MobileFilters(props) {
  const setFilter = (filter) => {
    props.setFilter(filter);
  };
  return (
    <Filter>
      <input
        type="radio"
        name="type-mobile"
        id="All-mobile"
        defaultChecked
        onChange={(e) => setFilter(e.target.labels[0].className.split(" ")[2])}
      />
      <Labels htmlFor="All-mobile" className="All">
        All
      </Labels>
      <input
        type="radio"
        name="type-mobile"
        id="Anime-mobile"
        onChange={(e) => setFilter(e.target.labels[0].className.split(" ")[2])}
      />
      <Labels htmlFor="Anime-mobile" className="Anime">
        Anime
      </Labels>
      <input
        type="radio"
        name="type-mobile"
        id="Manga-mobile"
        onChange={(e) => setFilter(e.target.labels[0].className.split(" ")[2])}
      />
      <Labels htmlFor="Manga-mobile" className="Manga">
        Manga
      </Labels>
      <input
        type="radio"
        name="type-mobile"
        id="Manhwa-mobile"
        onChange={(e) => setFilter(e.target.labels[0].className.split(" ")[2])}
      />
      <Labels htmlFor="Manhwa-mobile" className="Manhwa">
        Manhwa
      </Labels>
    </Filter>
  );
}

export default MobileFilters;
