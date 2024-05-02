import React from "react";
import EllipsisText from "react-ellipsis-text/lib/components/EllipsisText";
import { motion } from "framer-motion";

function AnimeEntry(props) {
  const percentage =
    Math.round((props.anime.completed / props.anime.total) * 100) + "%";

  const add = (e) => {
    e.stopPropagation();
    props.changeAnime(props.index, true);
  };
  const sub = (e) => {
    e.stopPropagation();
    props.changeAnime(props.index, false);
  };

  return (
    <motion.div
      key={props.index}
      animate={{ x: [-100, 0], opacity: [0.7, 1] }}
      exit={{ x: 100 }}
      className="anime-entry"
      onClick={() => {
        props.setModal([true, 1, props.index]);
      }}
    >
      <div className="left">
        <h3 className="title">
          <EllipsisText text={props.anime.title} length={40} />
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
    </motion.div>
  );
}

export default AnimeEntry;
