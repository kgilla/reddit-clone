import "./DropdownItem.css";
import { Link } from "react-router-dom";

const DropdownItem = ({ href, onClick, children }) => {
  return (
    <Link to={href} className="dropdown-item" onClick={onClick}>
      {children}
    </Link>
  );
};

export default DropdownItem;
