import React, { useState } from "react";
import AnimeEntry from "./AnimeEntry";
import MobileFilters from "./MobileFilters";

function AnimeList(props) {
  let storedData;
  if (localStorage.getItem("list")) {
    storedData = JSON.parse(localStorage.getItem("list"));
  } else {
    storedData = [
      { title: "Naruto", total: 12, completed: 6, type: "Manga" },
      { title: "Naruto", total: 12, completed: 6, type: "Anime" },
      { title: "Naruto", total: 12, completed: 6, type: "Webtoon" },
      { title: "Naruto", total: 12, completed: 6, type: "Anime" },
      { title: "Naruto", total: 12, completed: 6, type: "Anime" },
      { title: "Naruto", total: 12, completed: 6, type: "Anime" },
    ];
    localStorage.setItem("list", JSON.stringify(storedData));
  }
  const [anime, setAnime] = useState(storedData);

  const changeAnime = (index, add) => {
    if (add == true) {
      if (anime[index].completed < anime[index].total) {
        anime[index].completed = anime[index].completed + 1;
        setAnime((prevAnime) => [...anime]);
        localStorage.setItem("list", JSON.stringify(anime));
      }
    } else {
      if (anime[index].completed > 0) {
        anime[index].completed = anime[index].completed - 1;
        setAnime((prevAnime) => [...anime]);
        localStorage.setItem("list", JSON.stringify(anime));
      }
    }
  };

  return (
    <div className="anime-list">
      <MobileFilters setFilter={props.setFilter} />
      <button id="new">+</button>
      {props.filter === "All"
        ? anime.map((anime, index) => {
            return (
              <AnimeEntry
                anime={anime}
                key={index}
                index={index}
                changeAnime={changeAnime}
              />
            );
          })
        : anime
            .filter((e) => e.type === props.filter)
            .map((anime, index) => {
              return (
                <AnimeEntry
                  anime={anime}
                  key={index}
                  index={index}
                  changeAnime={changeAnime}
                />
              );
            })}
    </div>
  );
}

export default AnimeList;
