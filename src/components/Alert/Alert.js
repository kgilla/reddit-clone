import "./Alert.css";

const Alert = ({ title, message, onSubmit }) => {
  const handleClick = (e) => {
    e.target.name === "confirm" ? onSubmit(true) : onSubmit(false);
  };

  return (
    <div className="alert-overlay">
      <div className="alert-container">
        <header className="alert-header">
          <h2 className="alert-title">{title}</h2>
        </header>
        <main className="alert-main">
          <p className="alert-message"> {message}</p>
        </main>
        <footer className="alert-footer">
          <button
            name="confirm"
            onClick={handleClick}
            className="button-outline confirm"
          >
            Confirm
          </button>
          <button
            name="cancel"
            onClick={handleClick}
            className="button-filled cancel"
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Alert;
