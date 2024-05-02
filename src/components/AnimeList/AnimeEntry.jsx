import React from "react";
import EllipsisText from "react-ellipsis-text/lib/components/EllipsisText";
import { motion } from "framer-motion";

function AnimeEntry(props) {
  const [index, title, type, total, completed] = [
    props.index,
    props.anime.title,
    props.anime.type,
    props.anime.total,
    props.anime.completed,
  ];

  let percentage = Math.round((completed / total) * 100) + "%";

  // more accurate percentage for bigger numbers
  if (total >= 150) {
    percentage = Math.round((completed / total) * 1000) / 10 + "%";
  }

  const add = (e) => {
    e.stopPropagation();
    props.changeAnime(index, true);
  };
  const sub = (e) => {
    e.stopPropagation();
    props.changeAnime(index, false);
  };

  return (
    <motion.div
      key={index}
      animate={{ x: [-100, 0], opacity: [0.7, 1] }}
      className="anime-entry"
      onClick={() => {
        props.setModal([true, 1, index]);
      }}
    >
      <div className="left">
        <h3 className="title">
          <EllipsisText text={title} length={40} />
        </h3>
        <span className={"tag " + type}>{type}</span>
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
        <h4 className="count">{`${completed} / ${total}`}</h4>
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
