import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

function UpdateEntry(props) {
  const item = props.anime[props.index];
  const [show, setShow] = useState(true);
  const deleteHandler = () => {
    setShow(false);
    setTimeout(() => {
      props.setAnime((prevAnime) => {
        prevAnime.splice(props.index, 1);
        return [...prevAnime];
      });
      props.setModal([false, false]);
    }, 500);
  };
  return (
    <AnimatePresence>
      {show ? (
        <>
          <motion.div
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
              onChange={(e) =>
                props.setAnime((prevAnime) => {
                  if (+e.target.value <= prevAnime[props.index].total) {
                    console.log(
                      1,
                      e.target.value,
                      prevAnime[props.index].completed
                    );
                    prevAnime[props.index].completed = +e.target.value;
                    return [...prevAnime];
                  } else {
                    return [...prevAnime];
                  }
                })
              }
            />
            <button
              id="save-update"
              onClick={() => {
                setShow(false);
                setTimeout(() => {
                  props.setModal([false, false]);
                }, 500);
              }}
            >
              Save
            </button>
            <button id="delete-update" onClick={deleteHandler}>
              Delete
            </button>
          </motion.div>
          <motion.div
            exit={{ opacity: 0 }}
            key="update-backdrop"
            className="backdrop"
            onClick={() => {
              setShow(false);
              setTimeout(() => {
                props.setModal([false, false]);
              }, 500);
            }}
          ></motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default UpdateEntry;
