import { useState } from "react";
import "./App.css";
import AnimeList from "./components/AnimeList";
import Sidebar from "./components/Sidebar";

function App() {
  const [filter, setFilter] = useState("All");

  return (
    <>
      <header>Anime Tracker</header>
      <Sidebar setFilter={setFilter} />
      <AnimeList setFilter={setFilter} filter={filter} />
    </>
  );
}

export default App;
