import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import SearchItem from "./SearchItem";
function Search(props) {
  const queryRef = useRef();
  const searchQuery = (e) => {
    e.preventDefault();
    console.log(queryRef.current.value);
    queryRef.current.value = "";
    setResults([
      {
        title:
          "NarutoNarutoNarutoNarutoNarutoNarutoNarutoNarutoNarutoNarutoNarutoNarutoNarutoNaruto",
        total: 12,
        completed: 6,
        type: "Manga",
      },
      { title: "Naruto", total: 12, completed: 6, type: "Anime" },
      { title: "Naruto", total: 12, completed: 6, type: "Webtoon" },
      { title: "Naruto", total: 12, completed: 6, type: "Anime" },
      { title: "Naruto", total: 12, completed: 6, type: "Anime" },
      { title: "Naruto", total: 12, completed: 6, type: "Anime" },
    ]);
  };
  const [results, setResults] = useState([]);

  const addNew = (item) => {
    console.log(item);
    props.setAnime((prevAnime) => [...prevAnime, item]);
  };
  return (
    <>
      <div
        className="backdrop"
        onClick={() => {
          props.setModal([false, false]);
        }}
      ></div>
      <div className="search">
        <form className="search-bar" onSubmit={searchQuery}>
          <button>
            <IconContext.Provider value={{ className: "search-icon" }}>
              <FaSearch />
            </IconContext.Provider>
          </button>
          <input
            ref={queryRef}
            autoComplete="off"
            type="text"
            name="search"
            id="search-input"
            placeholder="Enter an anime name..."
          />
        </form>
        {results.length !== 0 ? (
          <div className="search-results">
            {results.map((item, index) => (
              <SearchItem item={item} addNew={addNew} key={index} />
            ))}
          </div>
        ) : (
          <p>Please search to get results!</p>
        )}
      </div>
    </>
  );
}

export default Search;
