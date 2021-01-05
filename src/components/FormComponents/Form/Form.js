import "./Form.css";

const Form = ({ handleSubmit, title, error, art, button, children }) => {
  return (
    <div className="form-container">
      <div className={`form-art art${art}`}></div>
      <form className="formy-form" onSubmit={handleSubmit}>
        <h2 className="form-heading">{title}</h2>
        {error ? <div className="error-block">{error}</div> : null}
        {children}
        <input type="submit" className="button-filled" value={button} />
      </form>
    </div>
  );
};

export default Form;
