import Login from "./Login";
import Signup from "./Signup";
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
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
