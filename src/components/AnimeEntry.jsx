import React from "react";
import EllipsisText from "react-ellipsis-text/lib/components/EllipsisText";

function AnimeEntry(props) {
  const percentage =
    Math.round((props.anime.completed / props.anime.total) * 100) + "%";

  const add = () => {
    props.changeAnime(props.index, true);
  };
  const sub = () => {
    props.changeAnime(props.index, false);
  };

  return (
    <div className="anime-entry">
      <div className="left">
        <h3 className="title">
          <EllipsisText text={props.anime.title} length={50} />
        </h3>
        <span className={"tag " + props.anime.type}>{props.anime.type}</span>
        <div className="progress-bar">
          <p className="text">{percentage}</p>
          <div
            className="progress-bar-fill"
            style={{
              width: percentage,
            }}
          ></div>
        </div>
      </div>
      <div className="right">
        <h4 className="count">{`${props.anime.completed} / ${props.anime.total}`}</h4>
        <div className="buttons">
          <button className="add" onClick={add}>
            +
          </button>
          <button className="sub" onClick={sub}>
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnimeEntry;
