import React from "react";
import AnimeEntry from "./AnimeEntry";
import MobileFilters from "./MobileFilters";

function AnimeList(props) {
  const changeAnime = (index, add) => {
    if (add == true) {
      if (props.anime[index].completed < props.anime[index].total) {
        props.anime[index].completed = props.anime[index].completed + 1;
        props.setAnime((prevAnime) => [...props.anime]);
      }
    } else {
      if (props.anime[index].completed > 0) {
        props.anime[index].completed = props.anime[index].completed - 1;
        props.setAnime((prevAnime) => [...props.anime]);
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
                anime={anime}
                key={index}
                index={index}
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
                  anime={anime}
                  key={index}
                  index={index}
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
