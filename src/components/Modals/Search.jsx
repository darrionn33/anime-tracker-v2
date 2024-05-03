import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import SearchItem from "./SearchItem";
import ReactLoading from "react-loading";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const SearchDiv = styled(motion.div)`
  position: relative;
  background-color: white;
  width: min(500px, 95dvw);
  opacity: 1;
  display: grid;
  grid-template-rows: 50px 1fr;
  padding: 20px;
  border-radius: 10px;
  justify-content: center;

  & > div:nth-child(2) {
    padding: 10px;
    display: flex;
    align-items: center;
  }
  & > div > input[type="radio"] {
    margin-left: 10px;
    margin-right: 5px;
  }
`;

const SearchBar = styled.form`
  display: flex;
  margin-bottom: 10px;

  & > button {
    position: absolute;
    right: 25px;
    color: grey;
    padding: 15px;
    font-size: large;
    width: 50px;
    height: 50px;
    border: none;
    background-color: transparent;
  }

  &::after {
    position: absolute;
    top: 27px;
    right: 70px;
    content: "";
    height: 35px;
    width: 3px;
    background-color: gray;
    opacity: 0.3;
  }
  & > button:has(+ input:focus) {
    color: black;
  }
  & > input {
    flex-grow: 1;
    width: min(450px, 85dvw);
    height: 50px;
    padding: 10px;
    padding-left: 20px;
    padding-right: 60px;
    border-radius: 30px;
    border: 1px solid gray;
  }
`;

const ResultsDiv = styled.div`
  overflow-y: scroll;
  height: min(500px, 60dvh);
  padding: 0 10px;
`;

const Placeholder = styled.div`
  color: gray;
  height: 100px;
  display: grid;
  place-items: center;
`;

function Search(props) {
  const queryRef = useRef();
  const resultsRef = useRef();
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([[], 0]);

  const closeUpdateEntry = () => {
    setShow(false);
    setTimeout(() => {
      props.setModal([false, false]);
    }, 500);
  };

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
    closeUpdateEntry();
  };
  return (
    <AnimatePresence>
      {show ? (
        <>
          <motion.div
            exit={{ opacity: 0 }}
            className="backdrop"
            onClick={() => {
              closeUpdateEntry();
            }}
          ></motion.div>
          <SearchDiv
            key="xyz"
            className="search"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
          >
            <SearchBar onSubmit={searchQuery}>
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
            </SearchBar>
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
              <Placeholder>
                <ReactLoading type={"spin"} color="#302674" />
              </Placeholder>
            ) : results[0].length !== 0 ? (
              <ResultsDiv ref={resultsRef}>
                {results[0].map((item, index) => (
                  <SearchItem
                    key={index}
                    item={item}
                    type={results[1]}
                    addNew={addNew}
                  />
                ))}
              </ResultsDiv>
            ) : (
              <Placeholder>Please search to get results!</Placeholder>
            )}
          </SearchDiv>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Search;
