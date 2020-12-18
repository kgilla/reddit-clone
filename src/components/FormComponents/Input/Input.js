import React from "react";
import "../FormComponents.css";

const Input = React.forwardRef(
  ({ name, label, type, placeholder, error }, ref) => {
    return (
      <div className="form-group">
        <label className="form-group-label" htmlFor={name}>
          {label}
        </label>
        <input
          className={error ? "form-group-input-error" : "form-group-input"}
          name={name}
          type={type}
          placeholder={placeholder}
          ref={ref}
        />
        {error ? <span className="error">{error}</span> : null}
      </div>
    );
  }
);

export default Input;
