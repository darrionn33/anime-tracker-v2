import React from "react";
import styled from "styled-components";

const ItemDiv = styled.div`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  background-color: var(--tertiary);

  & > div {
    flex: 1;
    gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  & > h3 {
    width: min(300px, 50dvw);
    overflow-x: auto;
  }
  & p:nth-child(2) {
    font-size: small;
  }

  & button {
    padding: 10px 15px;
    font-size: x-large;
    background-color: #00c857;
    color: white;
    border: none;
  }
`;

function SearchItem(props) {
  const item = props.item;

  const addNew = () => {
    item.type = type;
    item.total = 1;
    item.completed = 0;
    props.addNew(item);
  };

  let type;
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
    <ItemDiv>
      <div>
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
      <button onClick={addNew}>+</button>
    </ItemDiv>
  );
}

export default SearchItem;
