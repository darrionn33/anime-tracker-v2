import ReactDOM from "react-dom";
import Search from "./Search";

function Modal(props) {
  const options = [
    <Search setModal={props.setModal} setAnime={props.setAnime} />,
  ];
  return ReactDOM.createPortal(
    options[props.option],
    document.querySelector("#modal")
  );
}
export default Modal;
