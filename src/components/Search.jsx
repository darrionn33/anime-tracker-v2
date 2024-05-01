import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import SearchItem from "./SearchItem";
function Search(props) {
  const queryRef = useRef();
  const searchQuery = (e) => {
    e.preventDefault();
    const type = document.querySelector(
      'input[name="type-search"]:checked'
    ).value;
    fetch(`https://api.jikan.moe/v4/${type}?q=${queryRef.current.value}`)
      .then((response) => response.json())
      .then((data) => {
        if (type == "anime") {
          setResults([data.data, 1]);
        } else {
          setResults([data.data, 0]);
        }
      })
      .catch((e) => console.log({ error: e }));
    queryRef.current.value = "";
  };
  const [results, setResults] = useState([[], 0]);

  const addNew = (item) => {
    item.completed = 0;
    if (results[1] === 1 && !item.chapters) {
      item.total = 1;
    } else {
      item.total = item.chapters;
    }
    if (results[1] === 0 && !item.episodes) {
      item.total = 1;
    } else {
      item.total = item.episodes;
    }
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
        <div>
          <p>Type:</p>
          <input
            type="radio"
            name="type-search"
            id="anime-search"
            value="anime"
            defaultChecked
          />
          <label htmlFor="anime-search">Anime</label>
          <input
            type="radio"
            name="type-search"
            id="manga-search"
            value="manga"
          />
          <label htmlFor="manga-search">Manga</label>
        </div>
        {results[0].length !== 0 ? (
          <div className="search-results">
            {results[0].map((item, index) => (
              <SearchItem
                item={item}
                addNew={addNew}
                key={index}
                type={results[1]}
              />
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
