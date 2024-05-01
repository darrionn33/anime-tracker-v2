import React from "react";

function Sidebar(props) {
  const setFilter = (filter) => {
    props.setFilter(filter);
  };
  const showSearch = () => {
    props.setModal([true, 0]);
  };
  return (
    <div className="sidebar">
      <button id="new" onClick={showSearch}>
        +
      </button>
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
          id="Manhwa"
          onChange={(e) => setFilter(e.target.id)}
        />
        <label htmlFor="Manhwa">Manhwa</label>
      </div>
    </div>
  );
}

export default Sidebar;
