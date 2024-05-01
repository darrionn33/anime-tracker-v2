import React from "react";

function Sidebar(props) {
  const setFilter = (filter) => {
    props.setFilter(filter);
  };
  return (
    <div className="sidebar">
      <button id="new">+</button>
      <div className="divider"></div>
      <div className="filter">
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
          id="Webtoon"
          onChange={(e) => setFilter(e.target.id)}
        />
        <label htmlFor="Webtoon">Webtoon</label>
      </div>
    </div>
  );
}

export default Sidebar;
