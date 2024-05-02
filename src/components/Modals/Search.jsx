import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import SearchItem from "./SearchItem";
import ReactLoading from "react-loading";
import { AnimatePresence, motion } from "framer-motion";
function Search(props) {
  const queryRef = useRef();
  const resultsRef = useRef();
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([[], 0]);

  const searchQuery = (e) => {
    e.preventDefault();
    queryRef.current.blur(); // close keyboard on mobile
    if (resultsRef.current) {
      resultsRef.current.scrollTop = 0; // reset scroll if previously searched
    }
    if (queryRef.current.value !== "") {
      setLoading(true);
      const type = document.querySelector(
        'input[name="type-search"]:checked'
      ).value;
      const query = queryRef.current.value;
      fetch(`https://api.jikan.moe/v4/${type}?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.data.length > 0) {
            if (type == "anime") {
              setResults([data.data, 1]);
            } else {
              setResults([data.data, 0]);
            }
          } else {
            alert("No result found!");
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log({ error: e });
          setLoading(false);
          alert("Error! Maybe you're not online? Or maybe it's an API error.");
        });
      return;
    }
    alert("Please enter a search term!");
  };

  const addNew = (item) => {
    if (results[1] === 0 && item.chapters) {
      item.total = item.chapters;
    }
    if (results[1] === 1 && item.episodes) {
      item.total = item.episodes;
    }
    props.setAnime((prevAnime) => [...prevAnime, item]);
    setShow(false);
    setTimeout(() => {
      props.setModal([false, false]);
    }, 500);
  };
  return (
    <AnimatePresence>
      {show ? (
        <>
          <motion.div
            exit={{ opacity: 0 }}
            className="backdrop"
            onClick={() => {
              setShow(false);
              setTimeout(() => {
                props.setModal([false, false]);
              }, 500);
            }}
          ></motion.div>
          <motion.div
            key="xyz"
            className="search"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
          >
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
                placeholder="Enter a name..."
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
            {loading ? (
              <div className="loading">
                <ReactLoading type={"spin"} color="#302674" />
              </div>
            ) : results[0].length !== 0 ? (
              <div className="search-results" ref={resultsRef}>
                {results[0].map((item, index) => (
                  <SearchItem
                    key={index}
                    item={item}
                    type={results[1]}
                    addNew={addNew}
                  />
                ))}
              </div>
            ) : (
              <p>Please search to get results!</p>
            )}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Search;
