import ReactDOM from "react-dom";
import Search from "./Search";
import UpdateEntry from "./UpdateEntry";

function Modal(props) {
  const options = [
    <Search setModal={props.setModal} setAnime={props.setAnime} />,
    <UpdateEntry
      setModal={props.setModal}
      anime={props.anime}
      setAnime={props.setAnime}
      index={props.index}
    />,
  ];
  return ReactDOM.createPortal(
    options[props.option],
    document.querySelector("#modal")
  );
}
export default Modal;
