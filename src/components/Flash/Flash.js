import "./Flash.css";
import { useState, useEffect } from "react";

const Flash = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [message]);

  return (
    <div>
      {show ? (
        <div className="flash-container">
          <span className="flash-message">{message}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Flash;
