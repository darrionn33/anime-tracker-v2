import React from "react";

function SearchItem(props) {
  const item = props.item;
  let type;
  const addNew = () => {
    item.type = type;
    item.total = 1;
    item.completed = 0;
    props.addNew(item);
  };
  switch (item.type) {
    case "Movie":
    case "TV":
    case "CM":
    case "TV Special":
    case "PV":
    case "ONA":
    case "OVA":
      type = "Anime";
      break;
    case "Manga":
    case "Doujinshi":
    case "One-shot":
    case "Light Novel":
      type = "Manga";
      break;
    case "Manhwa":
      type = "Manhwa";
      break;
  }
  return (
    <div className="search-item">
      <div className="info">
        <h3>{item.title}</h3>
        {props.type ? (
          <p>
            <strong>Episodes: </strong>
            {item.episodes ? item.episodes : " ??"}
            {item.airing ? " (Ongoing)" : " (Completed)"}
          </p>
        ) : (
          <p>
            <strong>Chapters: </strong>
            {item.chapters ? item.chapters : " ??"}
            {item.publishing ? " (Ongoing)" : " (Completed)"}
          </p>
        )}
      </div>
      <button id="addNew" onClick={addNew}>
        +
      </button>
    </div>
  );
}

export default SearchItem;
