import React from "react";
import AnimeEntry from "./AnimeEntry";
import MobileFilters from "./MobileFilters";

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
    <div className="anime-list">
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
        <div className="empty">
          <p>so empty :(</p>
          <p>add something!</p>
          <p>T~T</p>
        </div>
      )}
    </div>
  );
}

export default AnimeList;
