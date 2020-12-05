import "./FormGroup.css";

const FormGroup = ({ name, type, handleChange, value, children }) => {
  return (
    <div className="form-group">
      <label className="form-group-label" htmlFor="username">
        {children}
      </label>
      <input
        className="form-group-input"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default FormGroup;
