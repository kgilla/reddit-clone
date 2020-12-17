import "./Form.css";

const Form = ({ image, click, btn, title, children }) => {
  return (
    <div className="form-container">
      <div className={`form-art art${image}`}></div>
      <form className="form-left">
        <h2 className="form-heading">{title}</h2>
        {children}
        <button className="button-filled" onClick={click}>
          {btn}
        </button>
      </form>
    </div>
  );
};

export default Form;
