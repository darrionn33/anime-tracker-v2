import React from "react";

function MobileFilters(props) {
  const setFilter = (filter) => {
    props.setFilter(filter);
  };
  return (
    <div className="filter">
      <input
        type="radio"
        name="type-mobile"
        id="All-mobile"
        defaultChecked
        onChange={(e) => setFilter(e.target.labels[0].className)}
      />
      <label htmlFor="All-mobile" className="All">
        All
      </label>
      <input
        type="radio"
        name="type-mobile"
        id="Anime-mobile"
        onChange={(e) => setFilter(e.target.labels[0].className)}
      />
      <label htmlFor="Anime-mobile" className="Anime">
        Anime
      </label>
      <input
        type="radio"
        name="type-mobile"
        id="Manga-mobile"
        onChange={(e) => setFilter(e.target.labels[0].className)}
      />
      <label htmlFor="Manga-mobile" className="Manga">
        Manga
      </label>
      <input
        type="radio"
        name="type-mobile"
        id="Manhwa-mobile"
        onChange={(e) => setFilter(e.target.labels[0].className)}
      />
      <label htmlFor="Manhwa-mobile" className="Manhwa">
        Manhwa
      </label>
    </div>
  );
}

export default MobileFilters;
