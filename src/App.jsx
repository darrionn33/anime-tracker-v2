import { useEffect, useState } from "react";
import "./App.css";
import AnimeList from "./components/AnimeList";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";

function App() {
  let storedData;
  if (localStorage.getItem("list")) {
    storedData = JSON.parse(localStorage.getItem("list"));
  } else {
    storedData = [
      { title: "One Piece", total: 1024, completed: 655, type: "Manga" },
    ];
  }
  const [anime, setAnime] = useState(storedData);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(anime));
  }, [anime]);

  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState([false, null]);
  return (
    <>
      {modal[0] ? (
        <Modal option={modal[1]} setModal={setModal} setAnime={setAnime} />
      ) : null}
      <header>Anime Tracker</header>
      <Sidebar setFilter={setFilter} setModal={setModal} />
      <AnimeList
        anime={anime}
        setAnime={setAnime}
        setFilter={setFilter}
        filter={filter}
        setModal={setModal}
      />
    </>
  );
}

export default App;
