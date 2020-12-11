import Login from "./Login";
import Signup from "./Signup";
import { CloseOutline } from "@styled-icons/evaicons-outline";
import "./Modal.css";

const Modal = ({ type, removeModal, storeUser }) => {
  const handleClick = () => {
    removeModal();
  };

  const sendUserUp = (user) => {
    storeUser(user);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-art"></div>
        {type === "login" ? (
          <Login sendUserUp={sendUserUp} removeModal={removeModal} />
        ) : (
          <Signup removeModal={removeModal} />
        )}
        <button className="modal-close" onClick={handleClick}>
          <CloseOutline className="modal-close-icon" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
