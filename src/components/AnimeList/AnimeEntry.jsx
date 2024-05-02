import React from "react";
import EllipsisText from "react-ellipsis-text/lib/components/EllipsisText";
import { motion } from "framer-motion";
import styled from "styled-components";

const Button = styled.button`
  border-style: none;
  width: 45px;
  height: 35px;
  font-size: large;
  font-weight: 700;
`;

const AddButton = styled(Button)`
  background-color: var(--primary);
  color: var(--tertiary);
  margin-right: 5px;
`;
const SubButton = styled(Button)`
  border: 1px solid var(--primary);
  color: var(--primary);
`;
const EntryDiv = styled(motion.div)`
  width: 340px;
  height: 120px;
  display: flex;
  background-color: var(--tertiary);
  color: var(--primary);
  padding: 15px;
  border-radius: 10px;
`;
const LeftDiv = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: 1fr 25px 15px;
  & > h3 {
    overflow-wrap: anywhere;
  }
`;
const Tag = styled.span`
  height: min-content;
  width: min-content;
  font-size: small;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.$type == "Anime"
      ? "#8e2d7a"
      : props.$type == "Manga"
      ? "#f97a5d"
      : props.$type == "Manhwa"
      ? "#00c857"
      : "inherit"};
`;
const ProgressBar = styled.div`
  margin-top: 5px;
  width: 75%;
  height: 10px;
  border: 1px solid;
  border-radius: 10px;
  position: relative;

  & > div {
    border-radius: 10px;
    background-color: var(--primary);
    height: 100%;
    transition: width 0.3s;
    width: ${(props) => props.$percentage};
  }
  .40 {
  }
  & > p {
    font-size: 12px;
    position: absolute;
    right: -45px;
    bottom: -2px;
    display: flex;
    width: 40px;
  }
`;
const RightDiv = styled.div`
  width: 95px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

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
    <EntryDiv
      key={index}
      animate={{ x: [-100, 0], opacity: [0.7, 1] }}
      onClick={() => {
        props.setModal([true, 1, index]);
      }}
    >
      <LeftDiv>
        <h3 className="title">
          <EllipsisText text={title} length={40} />
        </h3>
        <Tag $type={type}>{type}</Tag>
        <ProgressBar $percentage={percentage}>
          <p>{percentage}</p>
          <div></div>
        </ProgressBar>
      </LeftDiv>
      <RightDiv>
        <h4>{`${completed} / ${total}`}</h4>
        <div>
          <AddButton onClick={add}>+</AddButton>
          <SubButton onClick={sub}>-</SubButton>
        </div>
      </RightDiv>
    </EntryDiv>
  );
}

export default AnimeEntry;
