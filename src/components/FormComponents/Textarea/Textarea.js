import React from "react";
import "../FormComponents.css";

const Textarea = React.forwardRef(
  ({ name, label, placeholder, error }, ref) => {
    return (
      <div className="form-group">
        <label className="form-group-label" htmlFor={name}>
          {label}
        </label>
        <textarea
          className={
            error ? "form-group-textarea-error" : "form-group-textarea"
          }
          name={name}
          placeholder={placeholder}
          ref={ref}
        ></textarea>
        {error ? <span className="error">{error}</span> : null}
      </div>
    );
  }
);

export default Textarea;
