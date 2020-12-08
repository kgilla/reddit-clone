import "./FormGroup.css";

const FormGroup = ({ name, type, handleChange, value, error, children }) => {
  return (
    <div className="form-group">
      {error ? <div className="error">{error}</div> : null}
      <label className="form-group-label" htmlFor="username">
        {children}
      </label>
      {type === "textarea" ? (
        <textarea
          className={error ? "form-group-input-error" : "form-group-textarea"}
          name={name}
          value={value}
          onChange={handleChange}
        ></textarea>
      ) : (
        <input
          className={error ? "form-group-input-error" : "form-group-input"}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        ></input>
      )}
    </div>
  );
};

export default FormGroup;
