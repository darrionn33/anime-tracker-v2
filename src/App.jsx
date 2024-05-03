import { useEffect, useState } from "react";
import "./App.css";
import AnimeList from "./components/AnimeList/AnimeList";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modals/Modal";
import Header from "./components/Header.jsx";

function App() {
  let storedData = []; // default data if no data

  if (localStorage.getItem("list")) {
    storedData = JSON.parse(localStorage.getItem("list"));
  }

  const [anime, setAnime] = useState(storedData);
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState([false]);

  // Save to local storage on every change
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(anime));
  }, [anime]);

  return (
    <>
      {modal[0] ? (
        <Modal
          option={modal[1]}
          index={modal[2]}
          anime={anime}
          setAnime={setAnime}
          setModal={setModal}
        />
      ) : null}
      <Header />
      <Sidebar setFilter={setFilter} setModal={setModal} />
      <AnimeList
        anime={anime}
        setAnime={setAnime}
        filter={filter}
        setFilter={setFilter}
        setModal={setModal}
      />
    </>
  );
}

export default App;
