import React from "react";
import AnimeEntry from "./AnimeEntry";
import MobileFilters from "./MobileFilters";
import styled from "styled-components";

const ListDiv = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  grid-column: 2/3;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 340px);
  grid-template-rows: repeat(auto-fill, 120px);
  gap: 20px;
  justify-content: center;

  & > button {
    display: none;
    position: fixed;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: x-large;
    border: 0;
    color: white;
    background-color: #2c993a;
    right: 20px;
    bottom: 40px;
  }

  @media (max-width: 650px) {
    grid-template-rows: 30px repeat(auto-fill, 120px);
    padding-top: 10px;
    grid-column: 1/3;

    & > button {
      display: block;
    }
  }
`;

const EmptyList = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & p {
    text-align: center;
    margin-bottom: 10px;
  }
`;

function AnimeList(props) {
  const changeAnime = (index, add) => {
    const anime = props.anime;
    let total = props.anime[index].total;
    let completed = props.anime[index].completed;

    if (add) {
      if (completed < total) {
        completed = completed + 1;
        anime[index].completed = completed;
        props.setAnime([...anime]);
      }
    } else {
      if (completed > 0) {
        completed = completed - 1;
        anime[index].completed = completed;
        props.setAnime([...anime]);
      }
    }
  };

  const showSearch = () => {
    props.setModal([true, 0]);
  };

  return (
    <ListDiv>
      <MobileFilters setFilter={props.setFilter} />
      <button id="new" onClick={showSearch}>
        +
      </button>
      {props.anime.length !== 0 ? (
        props.filter === "All" ? (
          props.anime.map((anime, index) => {
            return (
              <AnimeEntry
                key={index}
                index={index}
                anime={anime}
                changeAnime={changeAnime}
                setModal={props.setModal}
              />
            );
          })
        ) : (
          props.anime
            .filter((e) => e.type === props.filter)
            .map((anime, index) => {
              return (
                <AnimeEntry
                  key={index}
                  index={index}
                  anime={anime}
                  changeAnime={changeAnime}
                  setModal={props.setModal}
                />
              );
            })
        )
      ) : (
        <EmptyList>
          <p>so empty :(</p>
          <p>add something!</p>
          <p>T~T</p>
        </EmptyList>
      )}
    </ListDiv>
  );
}

export default AnimeList;
