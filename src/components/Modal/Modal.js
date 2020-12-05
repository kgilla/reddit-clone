import Login from "./Login";
import Signup from "./Signup";
import "./Modal.css";

const Modal = ({ type, removeModal }) => {
  const handleClick = () => {
    removeModal();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-art"></div>
        {type === "login" ? <Login /> : <Signup />}
        <button className="modal-close" onClick={handleClick}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
