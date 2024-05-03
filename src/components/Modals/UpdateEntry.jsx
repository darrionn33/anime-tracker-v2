import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

const ConfirmDiv = styled(motion.div)`
  z-index: 3;
  position: absolute;
  width: min(300px, 80dvw);
  background: var(--tertiary);
  color: var(--primary);
  border-radius: 10px;
  border: 1px solid;
  padding: 15px;
  text-align: center;

  & > p {
    margin-bottom: 50px;
  }

  & > div {
    width: 100%;
    display: flex;
    gap: 10px;
  }
  & div > button {
    flex: 1;
    height: 40px;
  }
  & button:nth-child(1) {
    background-color: rgb(255, 190, 190);
    border: 1px solid red;
    color: red;
  }
  & button:nth-child(2) {
    background-color: var(--background);
    border: 1px solid var(--primary);
    color: var(--primary);
  }
`;

const UpdateDiv = styled(motion.div)`
  z-index: 2;
  top: 0;
  width: min(350px, 90dvw);
  background: var(--tertiary);
  color: var(--primary);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  & h3 {
    display: grid;
    place-items: center;
    text-align: center;
    margin-bottom: 10px;
    height: 50px;
  }
  & input {
    height: 40px;
    margin-bottom: 5px;
    border: 1px solid var(--primary);
    padding-left: 10px;
  }
  & input:focus,
  & input:active {
    outline: none;
    border: 1px solid var(--primary);
  }
  & button {
    height: 40px;
  }
  & button:nth-child(6) {
    background-color: var(--primary);
    color: var(--tertiary);
    border-style: none;
  }
  & button:nth-child(7) {
    background-color: rgb(255, 190, 190);
    border: 1px solid red;
    color: red;
  }
`;

function UpdateEntry(props) {
  const item = props.anime[props.index];
  const [show, setShow] = useState(true);
  const [confirm, setConfirm] = useState(false);

  const completedInput = (e) =>
    props.setAnime((prevAnime) => {
      if (+e.target.value <= prevAnime[props.index].total) {
        console.log(1, e.target.value, prevAnime[props.index].completed);
        prevAnime[props.index].completed = +e.target.value;
        return [...prevAnime];
      } else {
        return [...prevAnime];
      }
    });

  const closeUpdateEntry = () => {
    setConfirm(false);
    setShow(false);
    setTimeout(() => {
      props.setModal([false, false]);
    }, 500);
  };

  const deleteHandler = () => {
    closeUpdateEntry();
    props.setAnime((prevAnime) => {
      prevAnime.splice(props.index, 1);
      return [...prevAnime];
    });
  };
  return (
    <AnimatePresence>
      {confirm ? (
        <ConfirmDiv
          key={69}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
        >
          <p>Are you sure you want to delete?</p>
          <div>
            <button onClick={deleteHandler}>Delete</button>
            <button
              onClick={() => {
                setConfirm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </ConfirmDiv>
      ) : null}
      {show ? (
        <>
          {" "}
          <UpdateDiv
            className="update-entry"
            key="update-entry"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
          >
            <h3>{item.title}</h3>
            <label htmlFor="update-total">Total</label>
            <input
              type="number"
              name="update-total"
              id="update-total"
              value={item.total}
              onChange={(e) =>
                props.setAnime((prevAnime) => {
                  prevAnime[props.index].total = e.target.value;
                  return [...prevAnime];
                })
              }
            />
            <label htmlFor="update-completed">Completed</label>
            <input
              type="number"
              name="update-completed"
              id="update-completed"
              value={item.completed}
              onChange={completedInput}
            />
            <button id="save-update" onClick={closeUpdateEntry}>
              Save
            </button>
            <button
              id="delete-update"
              onClick={() => {
                setConfirm(true);
              }}
            >
              Delete
            </button>
          </UpdateDiv>
          <motion.div
            exit={{ opacity: 0 }}
            key="update-backdrop"
            className="backdrop"
            onClick={closeUpdateEntry}
          ></motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default UpdateEntry;
