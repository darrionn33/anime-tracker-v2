import ReactDOM from "react-dom";
import Search from "./Search";
import UpdateEntry from "./UpdateEntry";

function Modal(props) {
  const options = [
    <Search setAnime={props.setAnime} setModal={props.setModal} />,
    <UpdateEntry
      index={props.index}
      anime={props.anime}
      setAnime={props.setAnime}
      setModal={props.setModal}
    />,
  ];
  return ReactDOM.createPortal(
    options[props.option],
    document.querySelector("#modal")
  );
}
export default Modal;
