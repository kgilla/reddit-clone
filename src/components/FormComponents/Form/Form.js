import "./Form.css";

const Form = ({ handleSubmit, title, error, art, children }) => {
  return (
    <div className="form-container">
      <div className={`form-art art${art}`}></div>
      <form className="form-left" onSubmit={handleSubmit}>
        <h2 className="form-heading">{title}</h2>
        {error ? <div className="error-block">{error}</div> : null}
        {children}
        <input type="submit" className="button-filled" />
      </form>
    </div>
  );
};

export default Form;
