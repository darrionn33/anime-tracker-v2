import React from "react";

function SearchItem(props) {
  const item = props.item;
  const addNew = () => {
    props.addNew(item);
  };
  return (
    <div className="search-item">
      <div className="info">
        <h3>{item.title}</h3>
        <p>
          <strong>{item.type === "Anime" ? "Episodes:" : "Chapters:"}</strong>
          {item.total}
        </p>
        <span className={"tag " + item.type}>{item.type}</span>
      </div>
      <button id="addNew" onClick={addNew}>
        +
      </button>
    </div>
  );
}

export default SearchItem;
