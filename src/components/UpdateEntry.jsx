import React from "react";

function UpdateEntry(props) {
  const item = props.anime[props.index];

  const deleteHandler = () => {
    props.setModal([false, false]);
    props.setAnime((prevAnime) => {
      prevAnime.splice(props.index, 1);
      return [...prevAnime];
    });
  };
  return (
    <>
      <div className="update-entry">
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
            props.setModal([false, false]);
          }}
        >
          Save
        </button>
        <button id="delete-update" onClick={deleteHandler}>
          Delete
        </button>
      </div>
      <div
        className="backdrop"
        onClick={() => {
          props.setModal([false, false]);
        }}
      ></div>
    </>
  );
}

export default UpdateEntry;
