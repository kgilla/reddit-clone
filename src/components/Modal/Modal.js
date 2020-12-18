import LoginForm from "../LoginForm";
import SignupForm from "../Forms/SignupForm";
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
        {type === "login" ? (
          <LoginForm sendUserUp={sendUserUp} removeModal={removeModal} />
        ) : (
          <SignupForm removeModal={removeModal} />
        )}
        <button className="modal-close" onClick={handleClick}>
          <CloseOutline className="modal-close-icon" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
