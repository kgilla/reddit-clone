import React from "react";
import "../FormComponents.css";

const Select = React.forwardRef(
  ({ name, label, defaultValue, optionsArray, error }, ref) => {
    return (
      <div className="form-group">
        <label htmlFor={name} className="form-group-label">
          {label}
        </label>
        <select name={name} defaultValue={defaultValue} ref={ref}>
          {optionsArray.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {error ? <span className="error">{error}</span> : null}
      </div>
    );
  }
);

export default Select;
