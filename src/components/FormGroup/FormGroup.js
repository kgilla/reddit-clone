import "./FormGroup.css";

const FormGroup = (props) => {
  const {
    name,
    type,
    handleChange,
    value,
    placeholder,
    autoComplete,
    children,
    error,
  } = props;

  return (
    <div className="form-group">
      <label className="form-group-label" htmlFor="username">
        {children}
      </label>
      {type === "textarea" ? (
        <textarea
          className={error ? "form-group-input-error" : "form-group-textarea"}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          className={error ? "form-group-input-error" : "form-group-input"}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        ></input>
      )}
      {error ? <div className="error">{error}</div> : null}
    </div>
  );
};

export default FormGroup;
