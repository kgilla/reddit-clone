import "./Flash.css";
import { useState, useEffect } from "react";

const Flash = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [message]);

  return show ? (
    <div className="flash-container">
      <aside className="blue-bar"></aside>
      <span className="flash-message">{message}</span>
    </div>
  ) : null;
};

export default Flash;
