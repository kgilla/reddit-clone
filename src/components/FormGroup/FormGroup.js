import "./FormGroup.css";

const FormGroup = ({
  name,
  type,
  handleChange,
  value,
  placeholder,
  error,
  style,
  id,
  children,
}) => {
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
          id={id}
          style={style}
        ></input>
      )}
    </div>
  );
};

export default FormGroup;
